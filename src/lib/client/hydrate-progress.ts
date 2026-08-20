import { ProgressRepository } from '../../repositories/ProgressRepository';
import { SessionRepository, formatFocusDuration } from '../../repositories/SessionRepository';
import { ReviewRepository } from '../../repositories/ReviewRepository';
import { SKILL_STATES, SKILL_STATE_LABELS } from '../../types';
import type { SkillState } from '../../types';

function nextState(state: SkillState): SkillState {
  const idx = SKILL_STATES.indexOf(state);
  return SKILL_STATES[(idx + 1) % SKILL_STATES.length];
}

function stateClass(state: SkillState): string {
  if (state === 'INTERVIEW_READY' || state === 'USED_IN_PROJECT') return 'text-signal-ink';
  if (state === 'NOT_STARTED') return 'text-muted';
  return 'text-ink';
}

function hydrateSkillRows(): void {
  document.querySelectorAll<HTMLElement>('.skill-row').forEach((row) => {
    const skillId = row.dataset.skillId;
    if (!skillId) return;
    const label = row.querySelector<HTMLElement>('.skill-state-label');
    const paint = (state: SkillState) => {
      if (!label) return;
      label.textContent = SKILL_STATE_LABELS[state];
      label.className = `skill-state-label shrink-0 font-mono text-[12px] uppercase tracking-[0.14em] ${stateClass(state)}`;
    };
    paint(ProgressRepository.skillState(skillId));

    row.addEventListener('click', (event) => {
      // La fila lleva enlaces al material: un clic sobre ellos no cambia el estado.
      if (event.target instanceof Element && event.target.closest('a')) return;
      const current = ProgressRepository.skillState(skillId);
      const next = nextState(current);
      ProgressRepository.setSkillState(skillId, next);
      paint(next);
    });
  });
}

function formatLogDate(iso: string): string {
  const date = new Date(iso);
  const day = date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase();
  const time = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${day} · ${time}`;
}

function hydrateDailyLog(): void {
  const list = document.getElementById('daily-log-list');
  const empty = document.getElementById('daily-log-empty');
  if (!list) return;

  const sessions = SessionRepository.all()
    .filter((s) => s.status === 'COMPLETE')
    .sort((a, b) => new Date(b.completedAt ?? b.date).getTime() - new Date(a.completedAt ?? a.date).getTime())
    .slice(0, 12);

  if (sessions.length === 0) {
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  list.innerHTML = sessions
    .map(
      (s) => `
      <li class="flex items-start justify-between gap-4 py-3">
        <div class="min-w-0">
          <p class="font-body text-sm text-ink">${s.note ? escapeHtml(s.note) : escapeHtml(s.taskTitle)}</p>
          <p class="mt-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">${escapeHtml(s.topic)} · ${formatLogDate(s.completedAt ?? s.date)}</p>
        </div>
        <p class="shrink-0 font-mono text-xs text-ink">${String(s.durationActualMin).padStart(2, '0')} MIN</p>
      </li>`,
    )
    .join('<hr class="border-rule" />');
}

function escapeHtml(value: string): string {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function hydrateWeeklyStats(): void {
  const week = SessionRepository.weekStats();
  setText('review-sessions', String(week.sessions).padStart(2, '0'));
  setText('review-focus', formatFocusDuration(week.focusMinutes));
  setText('review-completed', String(week.completedDays).padStart(2, '0'));
}

function hydrateReviewForm(): void {
  const form = document.getElementById('weekly-review-form');
  if (!(form instanceof HTMLFormElement)) return;

  const existing = ReviewRepository.currentWeekReview();
  const wentWell = form.querySelector<HTMLTextAreaElement>('[name="wentWell"]');
  const blocked = form.querySelector<HTMLTextAreaElement>('[name="blocked"]');
  const nextFocus = form.querySelector<HTMLTextAreaElement>('[name="nextFocus"]');
  if (existing) {
    if (wentWell) wentWell.value = existing.wentWell;
    if (blocked) blocked.value = existing.blocked;
    if (nextFocus) nextFocus.value = existing.nextFocus;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const week = SessionRepository.weekStats();
    ReviewRepository.save({
      sessions: week.sessions,
      focusMinutes: week.focusMinutes,
      completed: week.completedDays,
      wentWell: wentWell?.value ?? '',
      blocked: blocked?.value ?? '',
      nextFocus: nextFocus?.value ?? '',
    });
    const status = document.getElementById('review-saved-status');
    if (status) {
      status.hidden = false;
      window.setTimeout(() => {
        status.hidden = true;
      }, 2400);
    }
  });
}

function hydrateProgress(): void {
  hydrateSkillRows();
  hydrateDailyLog();
  hydrateWeeklyStats();
  hydrateReviewForm();
}

document.addEventListener('astro:page-load', hydrateProgress);
