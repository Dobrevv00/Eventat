// Управление на съгласието за бисквитки. Съхранява избора в localStorage и
// известява останалите компоненти чрез window events (без глобален state
// library). Готово за gate-ване на скриптове (напр. Google Tag Manager) —
// зареждай ги само когато `analytics` / `marketing` е true.

export type StoredConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const STORAGE_KEY = "eventat-cookie-consent";
export const OPEN_SETTINGS_EVENT = "eventat:open-cookie-settings";
export const CONSENT_UPDATED_EVENT = "eventat:cookie-consent-updated";

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : "",
    };
  } catch {
    return null;
  }
}

export function saveConsent(choice: {
  analytics: boolean;
  marketing: boolean;
}): StoredConsent {
  const value: StoredConsent = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, { detail: value }),
  );
  return value;
}

// Отваря панела с настройки от произволно място (напр. линк във футъра).
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
