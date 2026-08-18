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
  outcome: string;
  skillIds: string[];
}

export interface Skill {
  id: string;
  name: string;
  phaseId: string;
}

export interface Task {
  id: string;
  number: number;
  phaseId: string;
  skillId: string;
  title: string;
  estMinutes: number;
  order: number;
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
}

export interface ProgressState {
  skillStates: Record<string, SkillState>;
  completedTaskIds: string[];
  milestoneStatuses: Record<string, MilestoneStatus>;
}
