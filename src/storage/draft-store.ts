const SETTINGS_KEY = 'pacingpulse.settings.v1';
const DRAFT_KEY = 'pacingpulse.draft.v1';

export interface UserSettings {
  optInStorage: boolean;
  theme?: 'dark' | 'light';
  showMovingAverage?: boolean;
}

export class DraftStore {
  static getSettings(): UserSettings {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (!raw) return { optInStorage: false, showMovingAverage: true };
      return JSON.parse(raw);
    } catch {
      return { optInStorage: false, showMovingAverage: true };
    }
  }

  static setOptIn(enabled: boolean): void {
    try {
      const settings = this.getSettings();
      settings.optInStorage = enabled;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      if (!enabled) {
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch {
      // Ignore
    }
  }

  static saveDraft(text: string): boolean {
    const settings = this.getSettings();
    if (!settings.optInStorage) return false;

    try {
      localStorage.setItem(DRAFT_KEY, text);
      return true;
    } catch {
      return false;
    }
  }

  static loadDraft(): string | null {
    const settings = this.getSettings();
    if (!settings.optInStorage) return null;

    try {
      return localStorage.getItem(DRAFT_KEY);
    } catch {
      return null;
    }
  }

  static clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // Ignore
    }
  }
}
