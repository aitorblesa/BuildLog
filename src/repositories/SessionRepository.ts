import { StorageRepository } from './StorageRepository';
import type { WorkSession } from '../types';

interface SessionStore {
  sessions: WorkSession[];
  nextNumber: number;
}

const store = new StorageRepository<SessionStore>('buildlog.sessions', {
  sessions: [],
  nextNumber: 1,
});

function pad(n: number, len = 3): string {
  return String(n).padStart(len, '0');
}

function checksumFor(number: number, date: string): string {
  const compact = date.replace(/-/g, '').slice(2);
  return `RX-${pad(number)}-${compact}`;
}

function dateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function completedAtDate(session: WorkSession): Date {
  return new Date(session.completedAt ?? session.date);
}

export const SessionRepository = {
  all(): WorkSession[] {
    return store.read().sessions;
  },

  nextNumber(): number {
    return store.read().nextNumber;
  },

  createSession(input: {
    durationPlannedMin: number;
    taskId: string | null;
    taskTitle: string;
    skillId: string | null;
    topic: string;
  }): WorkSession {
    const { nextNumber } = store.read();
    const now = new Date();
    const session: WorkSession = {
      id: `s${Date.now()}`,
      number: nextNumber,
      date: now.toISOString(),
      completedAt: null,
      durationPlannedMin: input.durationPlannedMin,
      durationActualMin: 0,
      taskId: input.taskId,
      taskTitle: input.taskTitle,
      skillId: input.skillId,
      topic: input.topic,
      note: '',
      energyLevel: null,
      milestoneId: null,
      status: 'RUNNING',
      checksum: checksumFor(nextNumber, dateKey(now)),
    };
    store.update((s) => ({
      sessions: [...s.sessions, session],
      nextNumber: s.nextNumber + 1,
    }));
    return session;
  },

  complete(id: string, patch: { durationActualMin: number; note: string; energyLevel?: 1 | 2 | 3 | null }): WorkSession | null {
    let completed: WorkSession | null = null;
    store.update((s) => ({
      ...s,
      sessions: s.sessions.map((session) => {
        if (session.id !== id) return session;
        completed = {
          ...session,
          completedAt: new Date().toISOString(),
          durationActualMin: patch.durationActualMin,
          note: patch.note,
          energyLevel: patch.energyLevel ?? null,
          status: 'COMPLETE',
        };
        return completed;
      }),
    }));
    return completed;
  },

  abandon(id: string): void {
    store.update((s) => ({
      ...s,
      sessions: s.sessions.map((session) => (session.id === id ? { ...session, status: 'ABANDONED' as const } : session)),
    }));
  },

  todaysCompletedSessions(): WorkSession[] {
    const today = dateKey();
    return this.all().filter((s) => s.status === 'COMPLETE' && dateKey(completedAtDate(s)) === today);
  },

  isTodayMinimumDay(): boolean {
    return this.todaysCompletedSessions().length > 0;
  },

  lastNDaysMinimumDays(days: number): { date: string; done: boolean }[] {
    const result: { date: string; done: boolean }[] = [];
    const completed = this.all().filter((s) => s.status === 'COMPLETE');
    for (let i = days - 1; i >= 0; i -= 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = dateKey(d);
      const done = completed.some((s) => dateKey(completedAtDate(s)) === key);
      result.push({ date: key, done });
    }
    return result;
  },

  weekStats(): { sessions: number; focusMinutes: number; completedDays: number } {
    const days = this.lastNDaysMinimumDays(7);
    const completedDays = days.filter((d) => d.done).length;
    const weekStart = new Date(days[0].date);
    const completed = this.all().filter((s) => s.status === 'COMPLETE' && completedAtDate(s) >= weekStart);
    const focusMinutes = completed.reduce((sum, s) => sum + s.durationActualMin, 0);
    return { sessions: completed.length, focusMinutes, completedDays };
  },
};

export function formatFocusDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${pad(h, 2)}:${pad(m, 2)}`;
}
