import { StorageRepository } from './StorageRepository';
import type { ProgressState, SkillState, MilestoneStatus } from '../types';
import { SKILLS, TASKS, MILESTONES, getTasksForPhase } from '../data/roadmap';

const defaultState: ProgressState = {
  skillStates: Object.fromEntries(SKILLS.map((s, i) => [s.id, i === 0 ? 'PRACTICING' : i < 3 ? 'LEARNING' : 'NOT_STARTED'])) as Record<string, SkillState>,
  completedTaskIds: [],
  milestoneStatuses: Object.fromEntries(MILESTONES.map((m) => [m.id, m.status])) as Record<string, MilestoneStatus>,
};

const store = new StorageRepository<ProgressState>('buildlog.progress', defaultState);

export const ProgressRepository = {
  read(): ProgressState {
    return store.read();
  },

  skillState(skillId: string): SkillState {
    return store.read().skillStates[skillId] ?? 'NOT_STARTED';
  },

  setSkillState(skillId: string, state: SkillState): void {
    store.update((s) => ({ ...s, skillStates: { ...s.skillStates, [skillId]: state } }));
  },

  milestoneStatus(id: string): MilestoneStatus {
    return store.read().milestoneStatuses[id] ?? 'PENDING';
  },

  setMilestoneStatus(id: string, status: MilestoneStatus): void {
    store.update((s) => ({ ...s, milestoneStatuses: { ...s.milestoneStatuses, [id]: status } }));
  },

  completeTask(taskId: string): void {
    store.update((s) =>
      s.completedTaskIds.includes(taskId) ? s : { ...s, completedTaskIds: [...s.completedTaskIds, taskId] },
    );
  },

  isTaskComplete(taskId: string): boolean {
    return store.read().completedTaskIds.includes(taskId);
  },

  currentPhaseId(): string {
    const completed = new Set(store.read().completedTaskIds);
    for (const task of TASKS) {
      if (!completed.has(task.id)) return task.phaseId;
    }
    return TASKS[TASKS.length - 1]?.phaseId ?? 'p01';
  },

  nextTask(): (typeof TASKS)[number] | null {
    const completed = new Set(store.read().completedTaskIds);
    const phaseId = this.currentPhaseId();
    const phaseTasks = getTasksForPhase(phaseId);
    const next = phaseTasks.find((t) => !completed.has(t.id));
    return next ?? phaseTasks[0] ?? null;
  },

  upcomingTask(): (typeof TASKS)[number] | null {
    const completed = new Set(store.read().completedTaskIds);
    const current = this.nextTask();
    const phaseTasks = getTasksForPhase(this.currentPhaseId());
    const idx = current ? phaseTasks.findIndex((t) => t.id === current.id) : -1;
    for (let i = idx + 1; i < phaseTasks.length; i += 1) {
      if (!completed.has(phaseTasks[i].id)) return phaseTasks[i];
    }
    return null;
  },
};
