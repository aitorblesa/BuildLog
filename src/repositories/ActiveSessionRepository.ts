import { StorageRepository } from './StorageRepository';

export interface ActiveSessionPointer {
  sessionId: string | null;
  startedAt: number | null;
  plannedMinutes: number;
  pausedRemainingSec: number | null;
}

const store = new StorageRepository<ActiveSessionPointer>('buildlog.activeSession', {
  sessionId: null,
  startedAt: null,
  plannedMinutes: 25,
  pausedRemainingSec: null,
});

export const ActiveSessionRepository = {
  read(): ActiveSessionPointer {
    return store.read();
  },
  set(pointer: ActiveSessionPointer): void {
    store.write(pointer);
  },
  clear(): void {
    store.write({ sessionId: null, startedAt: null, plannedMinutes: 25, pausedRemainingSec: null });
  },
};
