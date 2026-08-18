import { ProgressRepository } from '../../repositories/ProgressRepository';
import { SessionRepository } from '../../repositories/SessionRepository';
import { getPhase } from '../../data/roadmap';

export interface CoachContext {
  currentPhaseId: string;
  nextTaskTitle: string | null;
  weekSessions: number;
  weekFocusMinutes: number;
  minimumDaysThisWeek: number;
}

export interface CoachMessage {
  role: 'user' | 'coach';
  content: string;
}

/**
 * Contract for the future remote AI coach. buildCoachContext() below is what
 * gets sent as grounding once a real provider is wired in — see LocalCareerCoach
 * for the interim, fully offline implementation.
 */
export interface CareerCoach {
  ask(prompt: string, context: CoachContext): Promise<CoachMessage>;
}

export function buildCoachContext(): CoachContext {
  const phaseId = ProgressRepository.currentPhaseId();
  const next = ProgressRepository.nextTask();
  const week = SessionRepository.weekStats();
  return {
    currentPhaseId: phaseId,
    nextTaskTitle: next?.title ?? null,
    weekSessions: week.sessions,
    weekFocusMinutes: week.focusMinutes,
    minimumDaysThisWeek: week.completedDays,
  };
}

/**
 * Deterministic, offline stand-in so the coaching surface is usable before a
 * real model is wired up. Swap for a RemoteCareerCoach implementing the same
 * interface once an API key is available — nothing else in the app changes.
 */
export class LocalCareerCoach implements CareerCoach {
  async ask(prompt: string, context: CoachContext): Promise<CoachMessage> {
    const phase = getPhase(context.currentPhaseId);
    const lower = prompt.toLowerCase();

    if (lower.includes('30 min') || lower.includes('little time') || lower.includes('short on time')) {
      return {
        role: 'coach',
        content: `With little time, do only this: ${context.nextTaskTitle ?? 'a short kata from ' + (phase?.name ?? 'your current phase')}. Don't widen the scope.`,
      };
    }

    if (lower.includes("don't feel like") || lower.includes('no motivation') || lower.includes('smallest')) {
      return {
        role: 'coach',
        content: 'The smallest task that still moves the roadmap forward: open the editor and spend 10 minutes on the next task. That is enough to count as a minimum day.',
      };
    }

    if (lower.includes('what should i study') || lower.includes('what should i')) {
      return {
        role: 'coach',
        content: `Current focus: ${phase?.name ?? 'Phase 01'}. Next task: ${context.nextTaskTitle ?? 'check the roadmap'}.`,
      };
    }

    return {
      role: 'coach',
      content: `This week you've logged ${context.weekSessions} sessions and ${context.minimumDaysThisWeek}/7 minimum days. Keep going with ${phase?.name ?? 'your current phase'}.`,
    };
  }
}

export const careerCoach: CareerCoach = new LocalCareerCoach();

export const SUGGESTED_PROMPTS = [
  'What should I study today?',
  'I only have 30 minutes.',
  "I don't feel like it. Give me the smallest possible task.",
  'What should my focus be this week?',
];
