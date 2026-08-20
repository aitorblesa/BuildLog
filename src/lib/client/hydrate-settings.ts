import { SettingsRepository } from '../../repositories/SettingsRepository';
import { DEFAULT_MODEL, GeminiError, listModels, type GeminiModel } from '../gemini';

/** Rellena el desplegable de modelos, dejando seleccionado el que esté guardado. */
function fillModelSelect(select: HTMLSelectElement, models: GeminiModel[], selected: string): void {
  const ids = models.map((m) => m.id);
  const options = ids.includes(selected) ? models : [{ id: selected, label: selected }, ...models];
  select.replaceChildren(
    ...options.map((model) => {
      const option = document.createElement('option');
      option.value = model.id;
      option.textContent = model.id === model.label ? model.id : `${model.id} · ${model.label}`;
      option.selected = model.id === selected;
      return option;
    }),
  );
}

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

  const apiKey = document.getElementById('setting-gemini-key');
  const modelSelect = document.getElementById('setting-gemini-model');
  const testButton = document.getElementById('setting-gemini-test');
  const status = document.getElementById('setting-gemini-status');

  if (apiKey instanceof HTMLInputElement) {
    apiKey.value = settings.geminiApiKey;
    apiKey.addEventListener('change', () => {
      SettingsRepository.update({ geminiApiKey: apiKey.value.trim() });
      if (status) status.textContent = apiKey.value.trim() ? 'CLAVE GUARDADA EN ESTE NAVEGADOR' : 'SIN CLAVE — EL REPASO ESTÁ DESACTIVADO';
    });
  }

  if (modelSelect instanceof HTMLSelectElement) {
    // Hasta que se pruebe la conexión solo se conoce el modelo guardado.
    fillModelSelect(modelSelect, [], settings.geminiModel || DEFAULT_MODEL);
    modelSelect.addEventListener('change', () => {
      SettingsRepository.update({ geminiModel: modelSelect.value });
    });
  }

  if (testButton instanceof HTMLButtonElement && status) {
    testButton.addEventListener('click', async () => {
      const key = apiKey instanceof HTMLInputElement ? apiKey.value.trim() : SettingsRepository.read().geminiApiKey;
      if (!key) {
        status.textContent = 'FALTA LA CLAVE DE API';
        return;
      }
      SettingsRepository.update({ geminiApiKey: key });
      testButton.disabled = true;
      status.textContent = 'PROBANDO…';
      try {
        const models = await listModels(key);
        if (modelSelect instanceof HTMLSelectElement) {
          const current = SettingsRepository.read().geminiModel || DEFAULT_MODEL;
          fillModelSelect(modelSelect, models, current);
        }
        status.textContent = `CONEXIÓN OK · ${models.length} MODELOS DISPONIBLES`;
      } catch (error) {
        status.textContent = error instanceof GeminiError ? error.message.toUpperCase() : 'NO SE HA PODIDO CONECTAR';
      } finally {
        testButton.disabled = false;
      }
    });
  }

  const questions = document.getElementById('setting-quiz-questions');
  if (questions instanceof HTMLInputElement) {
    questions.value = String(settings.quizQuestions);
    questions.addEventListener('change', () => {
      const value = Math.min(8, Math.max(2, Number(questions.value) || 4));
      questions.value = String(value);
      SettingsRepository.update({ quizQuestions: value });
    });
  }
}

document.addEventListener('astro:page-load', hydrateSettings);
