import { ProgressRepository } from '../../repositories/ProgressRepository';
import { PHASES, MILESTONES, getPhase, getSkill, getSkillLabel } from '../../data/roadmap';

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
    if (skillId) setText('road-current-focus', getSkillLabel(skillId).toUpperCase());
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
      : '<li class="font-body text-sm text-muted">No hay carencias importantes en las fases clave.</li>';
  }

  const nextMilestone = MILESTONES.find((m) => ProgressRepository.milestoneStatus(m.id) !== 'DONE');
  if (nextMilestone) {
    setText('road-next-milestone', `${nextMilestone.code} · ${nextMilestone.title.toUpperCase()}`);
  }
}

function hydrateCareer(): void {
  hydrateRoadTo50k();
}

document.addEventListener('astro:page-load', hydrateCareer);
