import { SettingsRepository } from '../../repositories/SettingsRepository';

function hydrateSettings(): void {
  const settings = SettingsRepository.read();

  const toggle = document.getElementById('setting-work-first');
  if (toggle instanceof HTMLInputElement) {
    toggle.checked = settings.workFirstPlayLater;
    toggle.addEventListener('change', () => {
      SettingsRepository.update({ workFirstPlayLater: toggle.checked });
    });
  }

  const minutes = document.getElementById('setting-session-minutes');
  if (minutes instanceof HTMLInputElement) {
    minutes.value = String(settings.sessionMinutes);
    minutes.addEventListener('change', () => {
      const value = Math.min(90, Math.max(5, Number(minutes.value) || 25));
      minutes.value = String(value);
      SettingsRepository.update({ sessionMinutes: value });
    });
  }
}

document.addEventListener('astro:page-load', hydrateSettings);
