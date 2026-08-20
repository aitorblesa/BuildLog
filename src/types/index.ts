export type SkillState =
  | 'NOT_STARTED'
  | 'LEARNING'
  | 'PRACTICING'
  | 'CONFIDENT'
  | 'USED_IN_PROJECT'
  | 'INTERVIEW_READY';

export const SKILL_STATES: SkillState[] = [
  'NOT_STARTED',
  'LEARNING',
  'PRACTICING',
  'CONFIDENT',
  'USED_IN_PROJECT',
  'INTERVIEW_READY',
];

export interface Phase {
  id: string;
  number: number;
  name: string;
  goal: string;
  skillIds: string[];
}

/** Tipo de material de estudio enlazado desde una skill o una tarea. */
export type ResourceKind = 'CURSO' | 'VIDEO' | 'DOC' | 'PRACTICA';

export interface Resource {
  kind: ResourceKind;
  label: string;
  url: string;
  note?: string;
}

/**
 * Las skills forman un árbol de dos niveles: una skill raíz (React) agrupa a
 * sus lecciones (Hooks, Formularios...) mediante parentId. Las hojas son las
 * que llevan las tareas.
 */
export interface Skill {
  id: string;
  name: string;
  phaseId: string;
  /** Ausente en las skills raíz. */
  parentId?: string;
  summary?: string;
  resources?: Resource[];
}

export interface Task {
  id: string;
  number: number;
  phaseId: string;
  skillId: string;
  title: string;
  estMinutes: number;
  order: number;
  brief: string;
  /** Guion concreto de la sesión, paso a paso. */
  steps: string[];
  doneWhen: string[];
  resources?: Resource[];
}

export type MilestoneStatus = 'PENDING' | 'ACTIVE' | 'DONE';

export interface Milestone {
  id: string;
  code: string;
  title: string;
  status: MilestoneStatus;
  note?: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  type: string;
  competencies: string[];
  status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
}

export type SessionStatus = 'RUNNING' | 'PAUSED' | 'COMPLETE' | 'ABANDONED';

export interface WorkSession {
  id: string;
  number: number;
  date: string;
  completedAt: string | null;
  durationPlannedMin: number;
  durationActualMin: number;
  taskId: string | null;
  taskTitle: string;
  skillId: string | null;
  topic: string;
  note: string;
  energyLevel: 1 | 2 | 3 | null;
  milestoneId: string | null;
  status: SessionStatus;
  checksum: string;
}

export interface WeeklyReview {
  id: string;
  weekStart: string;
  sessions: number;
  focusMinutes: number;
  completed: number;
  wentWell: string;
  blocked: string;
  nextFocus: string;
}

export interface Settings {
  sessionMinutes: number;
  workFirstPlayLater: boolean;
  weeklyReviewDay: number;
  /** Clave de Google AI Studio para el repaso. Solo vive en este navegador. */
  geminiApiKey: string;
  geminiModel: string;
  /** Cuántas preguntas genera cada repaso. */
  quizQuestions: number;
}

/** Una pregunta de concepto generada por Gemini para una tarea. */
export interface QuizQuestion {
  /** El concepto que se está comprobando, para etiquetar la pregunta. */
  concept: string;
  prompt: string;
}

export type QuizVerdict = 'CORRECTO' | 'PARCIAL' | 'INCORRECTO';

/** Corrección de una respuesta, tal y como la devuelve Gemini. */
export interface QuizEvaluation {
  verdict: QuizVerdict;
  /** 0-100. */
  score: number;
  feedback: string;
  /** Lo que faltaba o estaba mal en la respuesta. */
  missing: string[];
  modelAnswer: string;
}

export interface QuizAttempt {
  id: string;
  date: string;
  taskId: string | null;
  skillId: string | null;
  concept: string;
  question: string;
  answer: string;
  verdict: QuizVerdict;
  score: number;
}

export interface ProgressState {
  skillStates: Record<string, SkillState>;
  completedTaskIds: string[];
  milestoneStatuses: Record<string, MilestoneStatus>;
}

/**
 * Los valores de los enums se guardan en localStorage, así que se mantienen en
 * inglés. Estos mapas son la única fuente de los textos visibles en castellano.
 */
export const SKILL_STATE_LABELS: Record<SkillState, string> = {
  NOT_STARTED: 'SIN EMPEZAR',
  LEARNING: 'APRENDIENDO',
  PRACTICING: 'PRACTICANDO',
  CONFIDENT: 'CON SOLTURA',
  USED_IN_PROJECT: 'USADO EN PROYECTO',
  INTERVIEW_READY: 'LISTO PARA ENTREVISTA',
};

export const RESOURCE_KIND_LABELS: Record<ResourceKind, string> = {
  CURSO: 'CURSO',
  VIDEO: 'VÍDEO',
  DOC: 'DOCS',
  PRACTICA: 'PRÁCTICA',
};

export const MILESTONE_STATUS_LABELS: Record<MilestoneStatus, string> = {
  PENDING: 'PENDIENTE',
  ACTIVE: 'EN CURSO',
  DONE: 'HECHO',
};

export const PROJECT_STATUS_LABELS: Record<Project['status'], string> = {
  PLANNED: 'PLANIFICADO',
  IN_PROGRESS: 'EN CURSO',
  DONE: 'HECHO',
};

export const QUIZ_VERDICT_LABELS: Record<QuizVerdict, string> = {
  CORRECTO: 'CORRECTO',
  PARCIAL: 'A MEDIAS',
  INCORRECTO: 'INCORRECTO',
};
