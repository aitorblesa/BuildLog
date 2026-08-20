import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { SettingsRepository } from '../../../repositories/SettingsRepository';
import { QuizRepository, type QuizStats } from '../../../repositories/QuizRepository';
import { contextForTaskId, evaluateAnswer, generateQuestions, type QuizContext } from '../../../lib/quiz';
import { GeminiError } from '../../../lib/gemini';
import { QUIZ_VERDICT_LABELS } from '../../../types';
import type { QuizEvaluation, QuizQuestion, Settings } from '../../../types';

interface Props {
  /** Tarea que el servidor ha podido resolver; el island la corrige con la URL. */
  taskId: string | null;
}

type Stage = 'intro' | 'answering' | 'result' | 'summary';
type Busy = 'questions' | 'evaluation' | null;

interface Answered {
  question: QuizQuestion;
  answer: string;
  evaluation: QuizEvaluation;
}

const easing = [0.4, 0, 0.2, 1] as const;

const API_KEY_URL = 'https://aistudio.google.com/apikey';

function verdictClass(verdict: QuizEvaluation['verdict']): string {
  if (verdict === 'CORRECTO') return 'border-ink bg-ink text-paper';
  if (verdict === 'PARCIAL') return 'border-rule-strong text-muted';
  return 'border-signal-ink text-signal-ink';
}

export default function ConceptQuiz({ taskId }: Props) {
  const [settings, setSettings] = useState<Settings | null>(null);
  // Se parte de la tarea que ha resuelto el servidor para que el primer pintado
  // ya diga algo; el efecto la corrige con la `?task=` real del navegador.
  const [context, setContext] = useState<QuizContext | null>(() => contextForTaskId(taskId));
  const [stats, setStats] = useState<QuizStats>({ answered: 0, correct: 0, averageScore: 0 });

  const [stage, setStage] = useState<Stage>('intro');
  const [busy, setBusy] = useState<Busy>(null);
  const [error, setError] = useState<string | null>(null);

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<QuizEvaluation | null>(null);
  const [answered, setAnswered] = useState<Answered[]>([]);

  const abortRef = useRef<AbortController | null>(null);
  // Igual que en el temporizador: la build es estática, así que el id real de
  // la tarea sale de la query string ya en el cliente.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setSettings(SettingsRepository.read());

    const urlTaskId = new URLSearchParams(window.location.search).get('task');
    const resolved = contextForTaskId(urlTaskId) ?? contextForTaskId(taskId);
    if (resolved) setContext(resolved);
    if (resolved?.taskId) setStats(QuizRepository.taskStats(resolved.taskId));

    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apiKey = settings?.geminiApiKey?.trim() ?? '';
  const model = settings?.geminiModel ?? '';
  const count = settings?.quizQuestions ?? 4;

  const current = questions[index] ?? null;
  const total = questions.length;

  const sessionStats = useMemo(() => {
    if (answered.length === 0) return { correct: 0, average: 0 };
    const sum = answered.reduce((acc, a) => acc + a.evaluation.score, 0);
    return {
      correct: answered.filter((a) => a.evaluation.verdict === 'CORRECTO').length,
      average: Math.round(sum / answered.length),
    };
  }, [answered]);

  function handleError(caught: unknown): void {
    if (caught instanceof DOMException && caught.name === 'AbortError') return;
    setError(caught instanceof GeminiError ? caught.message : 'Algo ha fallado al hablar con Gemini.');
  }

  async function startQuiz(): Promise<void> {
    if (!context) return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setBusy('questions');
    try {
      const generated = await generateQuestions({ apiKey, model, context, count, signal: controller.signal });
      if (generated.length === 0) {
        setError('Gemini no ha devuelto ninguna pregunta. Inténtalo de nuevo.');
        return;
      }
      setQuestions(generated);
      setIndex(0);
      setAnswer('');
      setEvaluation(null);
      setAnswered([]);
      setStage('answering');
    } catch (caught) {
      handleError(caught);
    } finally {
      setBusy(null);
    }
  }

  async function submitAnswer(text: string): Promise<void> {
    if (!context || !current) return;
    const trimmed = text.trim();
    if (trimmed.length === 0) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setBusy('evaluation');
    try {
      const result = await evaluateAnswer({
        apiKey,
        model,
        context,
        question: current,
        answer: trimmed,
        signal: controller.signal,
      });
      QuizRepository.save({
        taskId: context.taskId,
        skillId: context.skillId,
        question: current,
        answer: trimmed,
        evaluation: result,
      });
      setEvaluation(result);
      setAnswered((prev) => [...prev, { question: current, answer: trimmed, evaluation: result }]);
      setStage('result');
    } catch (caught) {
      handleError(caught);
    } finally {
      setBusy(null);
    }
  }

  function goNext(): void {
    setEvaluation(null);
    setAnswer('');
    if (index + 1 < total) {
      setIndex(index + 1);
      setStage('answering');
    } else {
      if (context?.taskId) setStats(QuizRepository.taskStats(context.taskId));
      setStage('summary');
    }
  }

  if (!context) {
    return (
      <p className="mt-8 font-body text-sm text-muted">
        No hay ninguna tarea que repasar. Vuelve a <a className="underline decoration-rule-strong underline-offset-4" href="/">Hoy</a> y entra al repaso desde la tarea.
      </p>
    );
  }

  const header = (
    <header>
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Repaso · Tarea {context.taskNumber}</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-ink">{context.skillName}</h1>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">{context.taskTitle}</p>
    </header>
  );

  const errorBlock = error && (
    <div role="alert" className="mt-6 border border-signal-ink px-4 py-3">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal-ink">Error</p>
      <p className="measure mt-1 font-body text-sm text-ink">{error}</p>
    </div>
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="py-2">
        {header}

        <div className="mt-6 h-px w-full bg-rule" />

        <p role="status" aria-live="polite" className="sr-only">
          {busy === 'questions' ? 'Generando preguntas' : busy === 'evaluation' ? 'Corrigiendo la respuesta' : ''}
        </p>

        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.section
              key="intro"
              initial={hydrated ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: easing }}
            >
              {settings === null ? (
                <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Cargando…</p>
              ) : apiKey.length === 0 ? (
                <div className="mt-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal-ink">Falta la clave de Gemini</p>
                  <p className="measure mt-3 font-body text-sm leading-relaxed text-ink">
                    El repaso usa Gemini para preguntarte y corregirte. Necesitas una clave de API de Google AI Studio,
                    que es gratuita: la creas en un minuto y se guarda solo en este navegador.
                  </p>
                  <ol className="mt-4 space-y-1.5">
                    {[
                      'Entra en aistudio.google.com/apikey con tu cuenta de Google.',
                      'Pulsa "Create API key" y copia la clave.',
                      'Pégala en Ajustes → Repaso con IA.',
                    ].map((step, i) => (
                      <li key={i} className="flex gap-2 font-body text-sm text-ink">
                        <span className="shrink-0 font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                        <span className="measure">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="/settings"
                      className="inline-flex min-h-[52px] flex-1 items-center justify-center border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink"
                    >
                      Ir a Ajustes
                    </a>
                    <a
                      href={API_KEY_URL}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex min-h-[52px] flex-1 items-center justify-center border border-rule-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-rule"
                    >
                      Conseguir clave
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Qué vas a repasar</p>
                  <p className="measure mt-2 font-body text-sm leading-relaxed text-ink">{context.brief}</p>

                  {stats.answered > 0 && (
                    <dl className="mt-6 grid grid-cols-3 gap-4">
                      <div>
                        <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Respondidas</dt>
                        <dd className="mt-1 font-display text-xl font-bold text-ink">{String(stats.answered).padStart(2, '0')}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Correctas</dt>
                        <dd className="mt-1 font-display text-xl font-bold text-ink">{String(stats.correct).padStart(2, '0')}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Nota media</dt>
                        <dd className="mt-1 font-display text-xl font-bold text-ink">{stats.averageScore}</dd>
                      </div>
                    </dl>
                  )}

                  <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                    {count} preguntas abiertas · respondes escribiendo · te corrige Gemini
                  </p>

                  <button
                    type="button"
                    onClick={startQuiz}
                    disabled={busy !== null}
                    className="mt-4 min-h-[52px] w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink disabled:opacity-50"
                  >
                    {busy === 'questions' ? 'Generando preguntas…' : 'Empezar repaso'}
                  </button>
                </div>
              )}
              {errorBlock}
            </motion.section>
          )}

          {stage === 'answering' && current && (
            <motion.section
              key={`q-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: easing }}
            >
              <div className="mt-6 flex items-center justify-between">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  Pregunta {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
                <p className="border border-rule px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {current.concept}
                </p>
              </div>

              <div className="mt-3 h-px w-full bg-rule" aria-hidden="true">
                <div className="h-px bg-signal transition-[width] duration-200 ease-out" style={{ width: `${(index / total) * 100}%` }} />
              </div>

              <p className="measure mt-6 font-display text-lg font-bold leading-snug text-ink">{current.prompt}</p>

              <label className="mt-6 block">
                <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Tu respuesta</span>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') void submitAnswer(answer);
                  }}
                  rows={6}
                  autoFocus
                  disabled={busy !== null}
                  placeholder="Explícalo con tus palabras, como se lo contarías a alguien en una entrevista."
                  className="mt-2 w-full resize-none border border-rule-strong bg-paper px-3 py-3 font-mono text-sm text-ink outline-none focus-visible:border-ink disabled:opacity-60"
                />
              </label>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => void submitAnswer('No lo sé.')}
                  disabled={busy !== null}
                  className="min-h-[52px] flex-1 border border-rule-strong px-4 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-rule disabled:opacity-50"
                >
                  No lo sé
                </button>
                <button
                  type="button"
                  onClick={() => void submitAnswer(answer)}
                  disabled={busy !== null || answer.trim().length === 0}
                  className="min-h-[52px] flex-[2] border border-ink bg-ink px-4 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink disabled:opacity-50"
                >
                  {busy === 'evaluation' ? 'Corrigiendo…' : 'Corregir'}
                </button>
              </div>
              {errorBlock}
            </motion.section>
          )}

          {stage === 'result' && evaluation && current && (
            <motion.section
              key={`r-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: easing }}
            >
              <div className="mt-6 flex items-center justify-between">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                  Pregunta {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </p>
                <p className={`border px-2 py-0.5 font-mono text-[12px] uppercase tracking-[0.14em] ${verdictClass(evaluation.verdict)}`}>
                  {QUIZ_VERDICT_LABELS[evaluation.verdict]}
                </p>
              </div>

              <p className="measure mt-4 font-body text-sm text-muted">{current.prompt}</p>

              <div className="mt-5 flex items-baseline justify-between">
                <p className="font-display text-4xl font-bold tabular-nums text-ink">{evaluation.score}</p>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">/ 100</p>
              </div>
              <div className="mt-2 h-px w-full bg-rule" aria-hidden="true">
                <div className="h-px bg-signal" style={{ width: `${evaluation.score}%` }} />
              </div>

              <div className="mt-6">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Corrección</p>
                <p className="measure mt-2 font-body text-sm leading-relaxed text-ink">{evaluation.feedback}</p>
              </div>

              {evaluation.missing.length > 0 && (
                <div className="mt-5">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Te has dejado</p>
                  <ul className="mt-2 space-y-1.5">
                    {evaluation.missing.map((item, i) => (
                      <li key={i} className="flex gap-2 font-body text-sm text-ink">
                        <span className="text-signal-ink" aria-hidden="true">·</span>
                        <span className="measure">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.modelAnswer && (
                <div className="mt-5 border border-rule px-4 py-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Respuesta esperada</p>
                  <p className="measure mt-2 font-body text-sm leading-relaxed text-ink">{evaluation.modelAnswer}</p>
                </div>
              )}

              <button
                type="button"
                onClick={goNext}
                className="mt-6 min-h-[52px] w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink"
              >
                {index + 1 < total ? 'Siguiente pregunta' : 'Ver resumen'}
              </button>
              {errorBlock}
            </motion.section>
          )}

          {stage === 'summary' && (
            <motion.section
              key="summary"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: easing }}
            >
              <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-signal-ink">Repaso terminado</p>
              <p className="mt-3 font-display text-4xl font-bold tabular-nums text-ink">{sessionStats.average}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">
                Nota media · {sessionStats.correct} de {answered.length} correctas
              </p>

              <div className="mt-6 h-px w-full bg-rule" />

              <ul className="mt-4 space-y-3">
                {answered.map((item, i) => (
                  <li key={i} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{item.question.concept}</p>
                      <p className="measure mt-1 font-body text-sm text-ink">{item.question.prompt}</p>
                    </div>
                    <span className={`shrink-0 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] ${verdictClass(item.evaluation.verdict)}`}>
                      {item.evaluation.score}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={startQuiz}
                  disabled={busy !== null}
                  className="min-h-[52px] flex-1 border border-rule-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-rule disabled:opacity-50"
                >
                  {busy === 'questions' ? 'Generando…' : 'Otras preguntas'}
                </button>
                <a
                  href="/"
                  className="inline-flex min-h-[52px] flex-1 items-center justify-center border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink"
                >
                  Volver a Hoy
                </a>
              </div>
              {errorBlock}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
