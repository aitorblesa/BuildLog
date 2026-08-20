import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { SessionRepository } from '../../../repositories/SessionRepository';
import { ActiveSessionRepository } from '../../../repositories/ActiveSessionRepository';
import { ProgressRepository } from '../../../repositories/ProgressRepository';
import { SettingsRepository } from '../../../repositories/SettingsRepository';
import { TASKS, getSkillLabel } from '../../../data/roadmap';
import { RESOURCE_KIND_LABELS } from '../../../types';
import type { Resource, WorkSession } from '../../../types';

interface Props {
  taskId: string | null;
  taskNumber: string;
  taskTitle: string;
  taskBrief: string | null;
  taskSteps: string[];
  taskDoneWhen: string[];
  taskResources: Resource[];
  skillId: string | null;
  skillName: string;
}

type DisplayTask = Props;

type Phase = 'running' | 'paused' | 'complete' | 'saved';

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

function formatTimeOfDay(date: Date): string {
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatReceiptDate(date: Date): string {
  return date
    .toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()
    .replace(',', '');
}

const easing = [0.4, 0, 0.2, 1] as const;

export default function SessionTimer(props: Props) {
  const [display, setDisplay] = useState<DisplayTask>(props);
  const [phase, setPhase] = useState<Phase>('running');
  const [session, setSession] = useState<WorkSession | null>(null);
  const [plannedSec, setPlannedSec] = useState(25 * 60);
  const [remainingSec, setRemainingSec] = useState(25 * 60);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState<WorkSession | null>(null);
  const intervalRef = useRef<number | null>(null);
  // The entrance animations start at opacity 0, which is also what the server
  // renders. If hydration ever fails the page would stay invisible, so the
  // first paint skips `initial` and only animates once React has taken over.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const settings = SettingsRepository.read();
    const planned = settings.sessionMinutes * 60;
    const pointer = ActiveSessionRepository.read();

    if (pointer.sessionId && pointer.startedAt) {
      const existing = SessionRepository.all().find((s) => s.id === pointer.sessionId && s.status === 'RUNNING');
      if (existing) {
        const existingTask = existing.taskId ? TASKS.find((t) => t.id === existing.taskId) : null;
        setDisplay({
          taskId: existing.taskId,
          taskNumber: existingTask ? String(existingTask.number).padStart(3, '0') : props.taskNumber,
          taskTitle: existing.taskTitle || props.taskTitle,
          taskBrief: existingTask?.brief ?? null,
          taskSteps: existingTask?.steps ?? [],
          taskDoneWhen: existingTask?.doneWhen ?? [],
          taskResources: existingTask?.resources ?? [],
          skillId: existing.skillId,
          skillName: existing.topic || props.skillName,
        });
        setSession(existing);
        setPlannedSec(pointer.plannedMinutes * 60);
        setStartedAtMs(pointer.startedAt);
        setPhase('running');
        return;
      }
    }

    // Static build: the server can't see the browser's query string, so the
    // task actually intended for this session is resolved here on the client.
    const urlTaskId = new URLSearchParams(window.location.search).get('task');
    const urlTask = urlTaskId ? TASKS.find((t) => t.id === urlTaskId) : null;
    const active: DisplayTask = urlTask
      ? {
          taskId: urlTask.id,
          taskNumber: String(urlTask.number).padStart(3, '0'),
          taskTitle: urlTask.title.toUpperCase(),
          taskBrief: urlTask.brief,
          taskSteps: urlTask.steps,
          taskDoneWhen: urlTask.doneWhen,
          taskResources: urlTask.resources ?? [],
          skillId: urlTask.skillId,
          skillName: getSkillLabel(urlTask.skillId) || props.skillName,
        }
      : props;
    setDisplay(active);

    const created = SessionRepository.createSession({
      durationPlannedMin: settings.sessionMinutes,
      taskId: active.taskId,
      taskTitle: active.taskTitle,
      skillId: active.skillId,
      topic: active.skillName,
    });
    const now = Date.now();
    setSession(created);
    setPlannedSec(planned);
    setStartedAtMs(now);
    ActiveSessionRepository.set({ sessionId: created.id, startedAt: now, plannedMinutes: settings.sessionMinutes, pausedRemainingSec: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== 'running' || startedAtMs === null) return;

    const tick = () => {
      const elapsed = (Date.now() - startedAtMs) / 1000;
      const left = plannedSec - elapsed;
      if (left <= 0) {
        setRemainingSec(0);
        setPhase('complete');
        if (intervalRef.current) window.clearInterval(intervalRef.current);
      } else {
        setRemainingSec(left);
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, 250);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [phase, startedAtMs, plannedSec]);

  const clock = formatClock(remainingSec);

  // Mirror the countdown in the browser tab so it stays readable while the
  // user works in another tab. The base title is restored on unmount.
  useEffect(() => {
    const baseTitle = document.title;
    return () => {
      document.title = baseTitle;
    };
  }, []);

  useEffect(() => {
    if (phase === 'running') document.title = `${clock} · Sesión · BuildLog`;
    else if (phase === 'paused') document.title = `❚❚ ${clock} · Sesión · BuildLog`;
    else if (phase === 'complete') document.title = 'Sesión completada · BuildLog';
    else document.title = 'Sesión · BuildLog';
  }, [phase, clock]);

  const startClock = useMemo(() => (startedAtMs ? formatTimeOfDay(new Date(startedAtMs)) : '--:--'), [startedAtMs]);
  const targetClock = useMemo(
    () => (startedAtMs ? formatTimeOfDay(new Date(startedAtMs + plannedSec * 1000)) : '--:--'),
    [startedAtMs, plannedSec],
  );

  function handlePause() {
    if (!startedAtMs) return;
    const elapsed = (Date.now() - startedAtMs) / 1000;
    setRemainingSec(Math.max(0, plannedSec - elapsed));
    ActiveSessionRepository.set({
      sessionId: session?.id ?? null,
      startedAt: null,
      plannedMinutes: plannedSec / 60,
      pausedRemainingSec: Math.max(0, plannedSec - elapsed),
    });
    setPhase('paused');
  }

  function handleResume() {
    const pointer = ActiveSessionRepository.read();
    const remaining = pointer.pausedRemainingSec ?? remainingSec;
    const now = Date.now();
    const newStart = now - (plannedSec - remaining) * 1000;
    setStartedAtMs(newStart);
    ActiveSessionRepository.set({ sessionId: session?.id ?? null, startedAt: newStart, plannedMinutes: plannedSec / 60, pausedRemainingSec: null });
    setPhase('running');
  }

  function finishNow() {
    setPhase('complete');
  }

  function handleSave() {
    if (!session) return;
    const elapsedMin = Math.round((plannedSec - remainingSec) / 60) || Math.round(plannedSec / 60);
    const completed = SessionRepository.complete(session.id, {
      durationActualMin: phase === 'complete' && remainingSec <= 0 ? Math.round(plannedSec / 60) : elapsedMin,
      note,
    });
    if (display.taskId) ProgressRepository.completeTask(display.taskId);
    ActiveSessionRepository.clear();
    if (completed) setSaved(completed);
    setPhase('saved');
  }

  const progressRatio = 1 - remainingSec / plannedSec;

  return (
    <MotionConfig reducedMotion="user">
    <div className="flex min-h-[70dvh] flex-col justify-center py-8">
      <AnimatePresence mode="wait">
        {(phase === 'running' || phase === 'paused') && (
          <motion.div
            key="timer"
            initial={hydrated ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: easing }}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                SESIÓN {String(session?.number ?? 0).padStart(3, '0')}
              </p>
              <p role="status" className={`font-mono text-[12px] uppercase tracking-[0.14em] ${phase === 'running' ? 'text-signal-ink' : 'text-muted'}`}>
                {phase === 'running' ? 'EN MARCHA' : 'EN PAUSA'}
              </p>
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">{display.skillName}</p>

            <p role="timer" className="mt-2 font-display text-[clamp(3.625rem,18vw,6.125rem)] font-bold leading-none tabular-nums tracking-tight text-ink">
              {clock}
            </p>

            <div className="mt-3 h-px w-full bg-rule" aria-hidden="true">
              <div
                className="h-px bg-signal transition-[width] duration-200 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
              />
            </div>

            <p className="mt-6 font-display text-lg font-bold uppercase leading-snug text-ink">{display.taskTitle}</p>
            <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">TAREA {display.taskNumber}</p>

            {display.taskBrief && (
              <p className="measure mt-3 font-body text-sm leading-relaxed text-ink">{display.taskBrief}</p>
            )}

            {display.taskSteps.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Cómo</p>
                <ol className="mt-2 space-y-1.5">
                  {display.taskSteps.map((step, i) => (
                    <li key={i} className="flex gap-2 font-body text-sm text-ink">
                      <span className="shrink-0 font-mono text-[12px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                      <span className="measure">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {display.taskResources.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Material</p>
                <ul className="mt-2 space-y-1">
                  {display.taskResources.map((resource) => (
                    <li key={resource.url}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-baseline gap-2 py-1"
                      >
                        <span className="shrink-0 border border-rule px-1 py-px font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                          {RESOURCE_KIND_LABELS[resource.kind]}
                        </span>
                        <span className="font-body text-sm text-ink underline decoration-rule-strong underline-offset-4">
                          {resource.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {display.taskDoneWhen.length > 0 && (
              <div className="mt-4">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Hecho cuando</p>
                <ul className="mt-2 space-y-1.5">
                  {display.taskDoneWhen.map((item, i) => (
                    <li key={i} className="flex gap-2 font-body text-sm text-ink">
                      <span className="text-muted" aria-hidden="true">□</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 h-px w-full bg-rule" />
            <div className="mt-4 flex justify-between">
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Inicio</p>
                <p className="font-mono text-xs text-ink">{startClock}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Objetivo</p>
                <p className="font-mono text-xs text-ink">{targetClock}</p>
              </div>
            </div>
            <div className="mt-4 h-px w-full bg-rule" />

            <div className="mt-8 flex gap-3">
              {phase === 'running' ? (
                <button
                  type="button"
                  onClick={handlePause}
                  className="flex-1 border border-rule-strong px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-rule min-h-[52px]"
                >
                  Pausar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResume}
                  className="flex-1 border border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-ink active:text-paper min-h-[52px]"
                >
                  Reanudar
                </button>
              )}
              <button
                type="button"
                onClick={finishNow}
                className="flex-1 border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink min-h-[52px]"
              >
                Terminar
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={hydrated ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: easing }}
          >
            <p role="status" className="font-mono text-[12px] uppercase tracking-[0.14em] text-signal-ink">Sesión Completada</p>
            <p className="mt-3 font-display text-4xl font-bold text-ink">
              {formatClock(Math.min(plannedSec, Math.max(0, plannedSec - remainingSec)))}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">{display.skillName} · TAREA {display.taskNumber}</p>

            <div className="mt-8 h-px w-full bg-rule" />

            <label className="mt-6 block">
              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">¿Qué has aprendido?</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Hook personalizado implementado y fetch de la API testeado."
                className="mt-2 w-full resize-none border border-rule-strong bg-paper px-3 py-3 font-mono text-sm text-ink outline-none focus-visible:border-ink"
              />
            </label>

            <button
              type="button"
              onClick={handleSave}
              className="mt-6 w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink min-h-[52px]"
            >
              Guardar Sesión
            </button>
          </motion.div>
        )}

        {phase === 'saved' && saved && (
          <motion.div
            key="saved"
            initial={hydrated ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: easing }}
            className="relative border border-ink px-5 py-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Sesión / {String(saved.number).padStart(3, '0')}</p>
              <motion.p
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.24, ease: easing }}
                className="border border-signal-ink px-2 py-0.5 font-mono text-[12px] uppercase tracking-[0.14em] text-signal-ink"
              >
                Completada
              </motion.p>
            </div>

            <div className="mt-4 h-px w-full bg-rule" />

            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Fecha</dt>
                <dd className="font-mono text-xs text-ink">{formatReceiptDate(new Date(saved.completedAt ?? saved.date))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Hora</dt>
                <dd className="font-mono text-xs text-ink">{formatTimeOfDay(new Date(saved.completedAt ?? saved.date))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Foco</dt>
                <dd className="font-mono text-xs text-ink">{display.skillName.toUpperCase()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Duración</dt>
                <dd className="font-mono text-xs text-ink">{formatClock(saved.durationActualMin * 60)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Tarea</dt>
                <dd className="text-right font-mono text-xs text-ink">{display.taskTitle}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Estado</dt>
                <dd className="font-mono text-xs text-signal-ink">COMPLETADA</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Checksum</dt>
                <dd className="font-mono text-xs text-ink">{saved.checksum}</dd>
              </div>
            </dl>

            <div className="mt-5 h-px w-full bg-rule" />

            {display.taskId && (
              <a
                href={`/repaso?task=${display.taskId}`}
                className="mt-6 inline-flex w-full items-center justify-center border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal-ink active:border-signal-ink min-h-[52px]"
              >
                Repasar Conceptos
              </a>
            )}

            <a
              href="/"
              className="mt-3 inline-flex w-full items-center justify-center border border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-ink active:text-paper min-h-[52px]"
            >
              Hecho Por Hoy
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
}
