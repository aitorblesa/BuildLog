import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SessionRepository } from '../../../repositories/SessionRepository';
import { ActiveSessionRepository } from '../../../repositories/ActiveSessionRepository';
import { ProgressRepository } from '../../../repositories/ProgressRepository';
import { SettingsRepository } from '../../../repositories/SettingsRepository';
import type { WorkSession } from '../../../types';

interface Props {
  taskId: string | null;
  taskNumber: string;
  taskTitle: string;
  skillId: string | null;
  skillName: string;
}

type Phase = 'running' | 'paused' | 'complete' | 'saved';

function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

function formatTimeOfDay(date: Date): string {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function formatReceiptDate(date: Date): string {
  return date
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    .toUpperCase()
    .replace(',', '');
}

const easing = [0.4, 0, 0.2, 1] as const;

export default function SessionTimer({ taskId, taskNumber, taskTitle, skillId, skillName }: Props) {
  const [phase, setPhase] = useState<Phase>('running');
  const [session, setSession] = useState<WorkSession | null>(null);
  const [plannedSec, setPlannedSec] = useState(25 * 60);
  const [remainingSec, setRemainingSec] = useState(25 * 60);
  const [startedAtMs, setStartedAtMs] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState<WorkSession | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const settings = SettingsRepository.read();
    const planned = settings.sessionMinutes * 60;
    const pointer = ActiveSessionRepository.read();

    if (pointer.sessionId && pointer.startedAt) {
      const existing = SessionRepository.all().find((s) => s.id === pointer.sessionId && s.status === 'RUNNING');
      if (existing) {
        setSession(existing);
        setPlannedSec(pointer.plannedMinutes * 60);
        setStartedAtMs(pointer.startedAt);
        setPhase('running');
        return;
      }
    }

    const created = SessionRepository.createSession({
      durationPlannedMin: settings.sessionMinutes,
      taskId,
      taskTitle,
      skillId,
      topic: skillName,
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
    if (taskId) ProgressRepository.completeTask(taskId);
    ActiveSessionRepository.clear();
    if (completed) setSaved(completed);
    setPhase('saved');
  }

  const progressRatio = 1 - remainingSec / plannedSec;

  return (
    <div className="flex min-h-[70dvh] flex-col justify-center py-8">
      <AnimatePresence mode="wait">
        {(phase === 'running' || phase === 'paused') && (
          <motion.div
            key="timer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: easing }}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                SESSION {String(session?.number ?? 0).padStart(3, '0')}
              </p>
              <p className={`font-mono text-[10px] uppercase tracking-[0.14em] ${phase === 'running' ? 'text-signal' : 'text-muted'}`}>
                {phase === 'running' ? 'RUNNING' : 'PAUSED'}
              </p>
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">{skillName}</p>

            <p className="mt-2 font-display text-[clamp(3.5rem,18vw,6rem)] font-bold leading-none tabular-nums tracking-tight text-ink">
              {formatClock(remainingSec)}
            </p>

            <div className="mt-3 h-px w-full bg-rule">
              <div
                className="h-px bg-signal transition-[width] duration-200 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
              />
            </div>

            <p className="mt-6 font-display text-lg font-bold uppercase leading-snug text-ink">{taskTitle}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">TASK {taskNumber}</p>

            <div className="mt-8 h-px w-full bg-rule" />
            <div className="mt-4 flex justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Start</p>
                <p className="font-mono text-xs text-ink">{startClock}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Target</p>
                <p className="font-mono text-xs text-ink">{targetClock}</p>
              </div>
            </div>
            <div className="mt-4 h-px w-full bg-rule" />

            <div className="mt-8 flex gap-3">
              {phase === 'running' ? (
                <button
                  type="button"
                  onClick={handlePause}
                  className="flex-1 border border-rule px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-rule min-h-[52px]"
                >
                  Pause
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleResume}
                  className="flex-1 border border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-ink active:text-paper min-h-[52px]"
                >
                  Resume
                </button>
              )}
              <button
                type="button"
                onClick={finishNow}
                className="flex-1 border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal active:border-signal min-h-[52px]"
              >
                Finish
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: easing }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Session Complete</p>
            <p className="mt-3 font-display text-4xl font-bold text-ink">
              {formatClock(Math.min(plannedSec, Math.max(0, plannedSec - remainingSec)))}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-muted">{skillName} · TASK {taskNumber}</p>

            <div className="mt-8 h-px w-full bg-rule" />

            <label className="mt-6 block">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">What did you learn?</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Implemented custom hook and tested API fetching."
                className="mt-2 w-full resize-none border border-rule bg-paper px-3 py-3 font-mono text-sm text-ink outline-none focus-visible:border-ink"
              />
            </label>

            <button
              type="button"
              onClick={handleSave}
              className="mt-6 w-full border border-ink bg-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-colors duration-150 active:bg-signal active:border-signal min-h-[52px]"
            >
              Save Session
            </button>
          </motion.div>
        )}

        {phase === 'saved' && saved && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: easing }}
            className="relative border border-ink px-5 py-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Session / {String(saved.number).padStart(3, '0')}</p>
              <motion.p
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.24, ease: easing }}
                className="border border-signal px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal"
              >
                Complete
              </motion.p>
            </div>

            <div className="mt-4 h-px w-full bg-rule" />

            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Date</dt>
                <dd className="font-mono text-xs text-ink">{formatReceiptDate(new Date(saved.completedAt ?? saved.date))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Time</dt>
                <dd className="font-mono text-xs text-ink">{formatTimeOfDay(new Date(saved.completedAt ?? saved.date))}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Focus</dt>
                <dd className="font-mono text-xs text-ink">{skillName.toUpperCase()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Duration</dt>
                <dd className="font-mono text-xs text-ink">{formatClock(saved.durationActualMin * 60)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Task</dt>
                <dd className="text-right font-mono text-xs text-ink">{taskTitle}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Status</dt>
                <dd className="font-mono text-xs text-signal">COMPLETE</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Checksum</dt>
                <dd className="font-mono text-xs text-ink">{saved.checksum}</dd>
              </div>
            </dl>

            <div className="mt-5 h-px w-full bg-rule" />

            <a
              href="/"
              className="mt-6 inline-flex w-full items-center justify-center border border-ink px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-ink transition-colors duration-150 active:bg-ink active:text-paper min-h-[52px]"
            >
              Done For Today
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
