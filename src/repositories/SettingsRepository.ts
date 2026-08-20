import { StorageRepository } from './StorageRepository';
import { DEFAULT_MODEL } from '../lib/gemini';
import type { Settings } from '../types';

const defaultSettings: Settings = {
  sessionMinutes: 25,
  workFirstPlayLater: true,
  weeklyReviewDay: 0,
  geminiApiKey: '',
  geminiModel: DEFAULT_MODEL,
  quizQuestions: 4,
};

const store = new StorageRepository<Settings>('buildlog.settings', defaultSettings);

export const SettingsRepository = {
  read(): Settings {
    return store.read();
  },
  update(patch: Partial<Settings>): Settings {
    return store.update((s) => ({ ...s, ...patch }));
  },
};
