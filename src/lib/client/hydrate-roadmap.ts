import { ProgressRepository } from '../../repositories/ProgressRepository';
import { MILESTONE_STATUS_LABELS, SKILL_STATE_LABELS } from '../../types';
import type { MilestoneStatus } from '../../types';

const CYCLE: MilestoneStatus[] = ['PENDING', 'ACTIVE', 'DONE'];

function statusClass(status: MilestoneStatus): string {
  if (status === 'DONE') return 'text-signal-ink';
  if (status === 'ACTIVE') return 'text-ink';
  return 'text-muted';
}

function paintRow(row: HTMLElement, status: MilestoneStatus): void {
  row.dataset.status = status;
  const label = row.querySelector('.milestone-status');
  if (label) {
    label.textContent = MILESTONE_STATUS_LABELS[status];
    label.className = `milestone-status font-mono text-[12px] uppercase tracking-[0.14em] ${statusClass(status)}`;
  }
}

function hydrateSkillStates(): void {
  document.querySelectorAll<HTMLElement>('[data-skill-state]').forEach((el) => {
    const skillId = el.dataset.skillId;
    if (!skillId) return;
    const state = ProgressRepository.skillState(skillId);
    el.textContent = SKILL_STATE_LABELS[state];
    el.classList.toggle('text-signal-ink', state === 'INTERVIEW_READY' || state === 'USED_IN_PROJECT');
    el.classList.toggle('text-muted', state === 'NOT_STARTED');
  });
}

function hydrateTaskStatus(): void {
  document.querySelectorAll<HTMLElement>('[data-task-id]').forEach((el) => {
    const taskId = el.dataset.taskId;
    if (!taskId) return;
    if (ProgressRepository.isTaskComplete(taskId)) {
      el.textContent = 'HECHO';
      el.classList.add('text-signal-ink');
      el.classList.remove('text-muted');
    }
  });
}

function hydrateMilestones(): void {
  document.querySelectorAll<HTMLElement>('.milestone-row').forEach((row) => {
    const id = row.dataset.milestoneId;
    if (!id) return;
    const status = ProgressRepository.milestoneStatus(id);
    paintRow(row, status);

    row.addEventListener('click', () => {
      const current = ProgressRepository.milestoneStatus(id);
      const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
      ProgressRepository.setMilestoneStatus(id, next);
      paintRow(row, next);
    });
  });
}

function hydrateRoadmap(): void {
  hydrateSkillStates();
  hydrateTaskStatus();
  hydrateMilestones();
}

document.addEventListener('astro:page-load', hydrateRoadmap);
