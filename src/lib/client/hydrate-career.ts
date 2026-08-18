import { ProgressRepository } from '../../repositories/ProgressRepository';
import { PHASES, MILESTONES, getPhase, getSkill } from '../../data/roadmap';
import { careerCoach, buildCoachContext, SUGGESTED_PROMPTS } from '../ai/CareerCoach';

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function hydrateRoadTo50k(): void {
  const phaseId = ProgressRepository.currentPhaseId();
  const phase = getPhase(phaseId);
  if (phase) {
    setText('road-current-phase', `${String(phase.number).padStart(2, '0')} · ${phase.name.toUpperCase()}`);
    const skillId = phase.skillIds[0];
    const skill = skillId ? getSkill(skillId) : undefined;
    if (skill) setText('road-current-focus', skill.name.toUpperCase());
  }

  const coreSkillIds = PHASES.slice(0, 3).flatMap((p) => p.skillIds);
  const gaps = coreSkillIds
    .map((id) => getSkill(id))
    .filter((s): s is NonNullable<typeof s> => !!s)
    .filter((s) => {
      const state = ProgressRepository.skillState(s.id);
      return state === 'NOT_STARTED' || state === 'LEARNING';
    })
    .slice(0, 4);

  const gapsList = document.getElementById('road-gaps');
  if (gapsList) {
    gapsList.innerHTML = gaps.length
      ? gaps.map((s) => `<li class="font-body text-sm text-ink">${s.name}</li>`).join('')
      : '<li class="font-body text-sm text-muted">No major gaps flagged in core phases.</li>';
  }

  const nextMilestone = MILESTONES.find((m) => ProgressRepository.milestoneStatus(m.id) !== 'DONE');
  if (nextMilestone) {
    setText('road-next-milestone', `${nextMilestone.code} · ${nextMilestone.title.toUpperCase()}`);
  }
}

function appendMessage(role: 'user' | 'coach', content: string): void {
  const list = document.getElementById('coach-transcript');
  if (!list) return;
  const item = document.createElement('div');
  item.className = role === 'user' ? 'text-right' : 'text-left';
  item.innerHTML = `
    <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">${role === 'user' ? 'YOU' : 'COACH'}</p>
    <p class="mt-1 font-body text-sm ${role === 'user' ? 'text-ink' : 'text-ink'}">${escapeHtml(content)}</p>
  `;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

function escapeHtml(value: string): string {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

async function sendPrompt(prompt: string): Promise<void> {
  if (!prompt.trim()) return;
  appendMessage('user', prompt);
  const context = buildCoachContext();
  const response = await careerCoach.ask(prompt, context);
  appendMessage('coach', response.content);
}

function hydrateCoach(): void {
  const form = document.getElementById('coach-form');
  const input = document.getElementById('coach-input');
  if (form instanceof HTMLFormElement && input instanceof HTMLInputElement) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const value = input.value;
      input.value = '';
      void sendPrompt(value);
    });
  }

  document.querySelectorAll<HTMLButtonElement>('.coach-suggestion').forEach((btn) => {
    btn.addEventListener('click', () => {
      void sendPrompt(btn.dataset.prompt ?? btn.textContent ?? '');
    });
  });

  const suggestionsRoot = document.getElementById('coach-suggestions');
  if (suggestionsRoot && suggestionsRoot.childElementCount === 0) {
    suggestionsRoot.innerHTML = SUGGESTED_PROMPTS.map(
      (p) => `<button type="button" class="coach-suggestion border border-rule px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors duration-150 hover:border-ink hover:text-ink" data-prompt="${escapeHtml(p)}">${escapeHtml(p)}</button>`,
    ).join('');
    document.querySelectorAll<HTMLButtonElement>('.coach-suggestion').forEach((btn) => {
      btn.addEventListener('click', () => {
        void sendPrompt(btn.dataset.prompt ?? btn.textContent ?? '');
      });
    });
  }
}

function hydrateCareer(): void {
  hydrateRoadTo50k();
  hydrateCoach();
}

document.addEventListener('astro:page-load', hydrateCareer);
