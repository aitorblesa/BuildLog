import { StorageRepository } from './StorageRepository';
import type { WeeklyReview } from '../types';

interface ReviewStore {
  reviews: WeeklyReview[];
}

const store = new StorageRepository<ReviewStore>('buildlog.reviews', { reviews: [] });

function currentWeekStart(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export const ReviewRepository = {
  all(): WeeklyReview[] {
    return store.read().reviews;
  },

  currentWeekReview(): WeeklyReview | null {
    const weekStart = currentWeekStart();
    return this.all().find((r) => r.weekStart === weekStart) ?? null;
  },

  save(input: { sessions: number; focusMinutes: number; completed: number; wentWell: string; blocked: string; nextFocus: string }): WeeklyReview {
    const weekStart = currentWeekStart();
    const review: WeeklyReview = { id: `wr-${weekStart}`, weekStart, ...input };
    store.update((s) => ({
      reviews: [...s.reviews.filter((r) => r.weekStart !== weekStart), review],
    }));
    return review;
  },
};
