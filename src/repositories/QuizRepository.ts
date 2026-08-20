import { StorageRepository } from './StorageRepository';
import type { QuizAttempt, QuizEvaluation, QuizQuestion } from '../types';

interface QuizStore {
  attempts: QuizAttempt[];
}

/** Tope de historial: el repaso es para practicar, no un archivo eterno. */
const MAX_ATTEMPTS = 200;

const store = new StorageRepository<QuizStore>('buildlog.quiz', { attempts: [] });

export interface QuizStats {
  answered: number;
  correct: number;
  averageScore: number;
}

function statsFor(attempts: QuizAttempt[]): QuizStats {
  if (attempts.length === 0) return { answered: 0, correct: 0, averageScore: 0 };
  const total = attempts.reduce((sum, a) => sum + a.score, 0);
  return {
    answered: attempts.length,
    correct: attempts.filter((a) => a.verdict === 'CORRECTO').length,
    averageScore: Math.round(total / attempts.length),
  };
}

export const QuizRepository = {
  all(): QuizAttempt[] {
    return store.read().attempts;
  },

  save(input: {
    taskId: string | null;
    skillId: string | null;
    question: QuizQuestion;
    answer: string;
    evaluation: QuizEvaluation;
  }): QuizAttempt {
    const attempt: QuizAttempt = {
      id: `q${Date.now()}`,
      date: new Date().toISOString(),
      taskId: input.taskId,
      skillId: input.skillId,
      concept: input.question.concept,
      question: input.question.prompt,
      answer: input.answer,
      verdict: input.evaluation.verdict,
      score: input.evaluation.score,
    };
    store.update((s) => ({ attempts: [...s.attempts, attempt].slice(-MAX_ATTEMPTS) }));
    return attempt;
  },

  forTask(taskId: string): QuizAttempt[] {
    return this.all().filter((a) => a.taskId === taskId);
  },

  taskStats(taskId: string): QuizStats {
    return statsFor(this.forTask(taskId));
  },

  skillStats(skillId: string): QuizStats {
    return statsFor(this.all().filter((a) => a.skillId === skillId));
  },

  overallStats(): QuizStats {
    return statsFor(this.all());
  },
};
