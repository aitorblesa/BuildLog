/**
 * Repaso de conceptos: construye el contexto de una tarea, pide las preguntas
 * a Gemini y le manda la respuesta escrita para que la corrija.
 */
import { generateJson, type Schema } from './gemini';
import { getSkill, getSkillLabel, TASKS } from '../data/roadmap';
import { RESOURCE_KIND_LABELS } from '../types';
import type { QuizEvaluation, QuizQuestion, Task } from '../types';

/** El contexto de estudio que ve el modelo para preguntar y para corregir. */
export interface QuizContext {
  taskId: string | null;
  taskNumber: string;
  taskTitle: string;
  skillId: string | null;
  skillName: string;
  brief: string;
  steps: string[];
  doneWhen: string[];
  resources: string[];
}

export function contextForTask(task: Task): QuizContext {
  const skill = getSkill(task.skillId);
  return {
    taskId: task.id,
    taskNumber: String(task.number).padStart(3, '0'),
    taskTitle: task.title,
    skillId: task.skillId,
    skillName: getSkillLabel(task.skillId),
    brief: [task.brief, skill?.summary].filter(Boolean).join(' '),
    steps: task.steps,
    doneWhen: task.doneWhen,
    resources: (task.resources ?? []).map((r) => `${RESOURCE_KIND_LABELS[r.kind]}: ${r.label}`),
  };
}

export function contextForTaskId(taskId: string | null): QuizContext | null {
  const task = taskId ? TASKS.find((t) => t.id === taskId) : null;
  return task ? contextForTask(task) : null;
}

const TUTOR_SYSTEM = [
  'Eres el tutor técnico de una persona que está aprendiendo desarrollo frontend en castellano.',
  'Tuteas, vas al grano y no adulas: si algo está mal, lo dices claro y explicas por qué.',
  'Preguntas y corriges sobre conceptos, criterio y "por qué", nunca sobre memorizar sintaxis exacta ni sobre detalles que no estén en el material de la tarea.',
  'Escribes siempre en castellano, en texto plano, sin markdown ni emojis.',
  'Devuelves única y exclusivamente el JSON que se te pide.',
].join(' ');

function contextBlock(context: QuizContext): string {
  const lines = [
    `Lección: ${context.skillName}`,
    `Tarea ${context.taskNumber}: ${context.taskTitle}`,
    `Resumen: ${context.brief}`,
  ];
  if (context.steps.length > 0) lines.push(`Guion de la sesión:\n- ${context.steps.join('\n- ')}`);
  if (context.doneWhen.length > 0) lines.push(`Se da por hecha cuando:\n- ${context.doneWhen.join('\n- ')}`);
  if (context.resources.length > 0) lines.push(`Material:\n- ${context.resources.join('\n- ')}`);
  return lines.join('\n');
}

const QUESTIONS_SCHEMA: Schema = {
  type: 'OBJECT',
  properties: {
    questions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          concept: { type: 'STRING', description: 'El concepto que comprueba la pregunta, en dos o tres palabras.' },
          prompt: { type: 'STRING', description: 'La pregunta, en una o dos frases.' },
        },
        required: ['concept', 'prompt'],
        propertyOrdering: ['concept', 'prompt'],
      },
    },
  },
  required: ['questions'],
};

const EVALUATION_SCHEMA: Schema = {
  type: 'OBJECT',
  properties: {
    verdict: { type: 'STRING', enum: ['CORRECTO', 'PARCIAL', 'INCORRECTO'] },
    score: { type: 'INTEGER', description: 'Nota de 0 a 100.' },
    feedback: { type: 'STRING', description: 'Dos o tres frases explicando la corrección.' },
    missing: { type: 'ARRAY', items: { type: 'STRING' }, description: 'Puntos que faltaban o estaban mal. Vacío si la respuesta es completa.' },
    modelAnswer: { type: 'STRING', description: 'La respuesta que se esperaba, en tres o cuatro frases.' },
  },
  required: ['verdict', 'score', 'feedback', 'missing', 'modelAnswer'],
  propertyOrdering: ['verdict', 'score', 'feedback', 'missing', 'modelAnswer'],
};

const VERDICTS = ['CORRECTO', 'PARCIAL', 'INCORRECTO'] as const;

export interface QuizRequest {
  apiKey: string;
  model: string;
  context: QuizContext;
  signal?: AbortSignal;
}

export async function generateQuestions(request: QuizRequest & { count: number }): Promise<QuizQuestion[]> {
  const { apiKey, model, context, count, signal } = request;

  const user = [
    'Este es el material que acabo de estudiar:',
    '',
    contextBlock(context),
    '',
    `Escribe ${count} preguntas abiertas para comprobar si de verdad he entendido estos conceptos.`,
    'Reglas: una idea por pregunta, sin preguntas de sí o no, sin opciones múltiples, y sin salirte de lo que cubre el material.',
    'Ordénalas de la más básica a la que exige más criterio. Al menos una debe pedir comparar dos cosas o justificar cuándo usar cada una.',
  ].join('\n');

  const data = await generateJson<{ questions?: QuizQuestion[] }>({
    apiKey,
    model,
    system: TUTOR_SYSTEM,
    user,
    schema: QUESTIONS_SCHEMA,
    temperature: 0.9,
    signal,
  });

  return (data.questions ?? [])
    .filter((q) => typeof q?.prompt === 'string' && q.prompt.trim().length > 0)
    .slice(0, count)
    .map((q) => ({ concept: (q.concept ?? '').trim() || context.skillName, prompt: q.prompt.trim() }));
}

export async function evaluateAnswer(
  request: QuizRequest & { question: QuizQuestion; answer: string },
): Promise<QuizEvaluation> {
  const { apiKey, model, context, question, answer, signal } = request;

  const user = [
    'Material estudiado:',
    '',
    contextBlock(context),
    '',
    `Pregunta: ${question.prompt}`,
    '',
    'Mi respuesta:',
    answer,
    '',
    'Corrígela. Valora si el concepto está entendido, no si la redacción es bonita ni si uso el vocabulario exacto.',
    'CORRECTO si la idea está bien y completa, PARCIAL si acierta pero se deja algo importante, INCORRECTO si el concepto está mal o la respuesta no contesta a la pregunta.',
    'Si digo algo falso, señálalo de forma explícita. Termina con la respuesta que se esperaba.',
  ].join('\n');

  const data = await generateJson<Partial<QuizEvaluation>>({
    apiKey,
    model,
    system: TUTOR_SYSTEM,
    user,
    schema: EVALUATION_SCHEMA,
    temperature: 0.2,
    signal,
  });

  const verdict = VERDICTS.includes(data.verdict as (typeof VERDICTS)[number]) ? (data.verdict as QuizEvaluation['verdict']) : 'PARCIAL';
  const rawScore = typeof data.score === 'number' ? data.score : 0;

  return {
    verdict,
    score: Math.max(0, Math.min(100, Math.round(rawScore))),
    feedback: (data.feedback ?? '').trim() || 'Sin comentarios del tutor.',
    missing: (data.missing ?? []).filter((item) => typeof item === 'string' && item.trim().length > 0),
    modelAnswer: (data.modelAnswer ?? '').trim(),
  };
}
