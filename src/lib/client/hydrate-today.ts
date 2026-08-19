import { ProgressRepository } from '../../repositories/ProgressRepository';
import { SessionRepository, formatFocusDuration } from '../../repositories/SessionRepository';
import { SettingsRepository } from '../../repositories/SettingsRepository';
import { getPhase, getSkillLabel, getTasksForPhase } from '../../data/roadmap';
import { SKILL_STATE_LABELS } from '../../types';

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function hydrateToday(): void {
  const phaseId = ProgressRepository.currentPhaseId();
  const phase = getPhase(phaseId);
  const task = ProgressRepository.nextTask();
  const upcoming = ProgressRepository.upcomingTask();
  const week = SessionRepository.weekStats();
  const settings = SettingsRepository.read();

  if (phase) {
    setText('current-phase-number', String(phase.number).padStart(2, '0'));
    setText('current-phase-name', phase.name.toUpperCase());
    // El foco es la lección de la siguiente tarea, no la primera skill de la fase.
    const skillId = task?.skillId ?? phase.skillIds[0];
    if (skillId) {
      setText('current-focus', getSkillLabel(skillId).toUpperCase());
      setText('current-focus-state', SKILL_STATE_LABELS[ProgressRepository.skillState(skillId)]);
    }
  }

  if (task) {
    setText('task-number', `TAREA ${String(task.number).padStart(3, '0')}`);
    setText('task-title', task.title.toUpperCase());
    setText('task-est', `${task.estMinutes} MIN`);
    const startLink = document.getElementById('start-session-link');
    if (startLink instanceof HTMLAnchorElement) {
      startLink.href = `/session?task=${task.id}`;
    }
  }

  setText('week-focus', formatFocusDuration(week.focusMinutes));
  setText('week-sessions', String(week.sessions).padStart(2, '0'));
  setText('week-minimum-days', `${week.completedDays} / 7`);

  if (upcoming) {
    setText('next-target', getSkillLabel(upcoming.skillId).toUpperCase());
  }

  const isDone = SessionRepository.isTodayMinimumDay();
  const workFirstBlock = document.getElementById('work-first-block');
  if (workFirstBlock) {
    workFirstBlock.hidden = !settings.workFirstPlayLater;
  }
  const workFirstPending = document.getElementById('work-first-pending');
  const workFirstDone = document.getElementById('work-first-done');
  if (workFirstPending && workFirstDone) {
    workFirstPending.hidden = isDone;
    workFirstDone.hidden = !isDone;
  }

  const totalTasks = getTasksForPhase(phaseId).length;
  const completedInPhase = getTasksForPhase(phaseId).filter((t) => ProgressRepository.isTaskComplete(t.id)).length;
  setText('phase-progress', `${completedInPhase} / ${totalTasks}`);
}

document.addEventListener('astro:page-load', hydrateToday);
