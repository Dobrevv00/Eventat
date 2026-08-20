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

/**
 * Google Consent Mode v2 — без това извикване Google не вижда избора на
 * посетителя и таговете остават постоянно "denied".
 * Маркетинговото съгласие управлява ad_storage / ad_user_data /
 * ad_personalization, аналитичното — analytics_storage.
 */
function updateGoogleConsent(consent: StoredConsent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag !== "function") {
    // Резервен вариант, ако инлайн скриптът в layout-а не се е изпълнил.
    window.gtag = function gtagFallback() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }

  const state = (allowed: boolean) => (allowed ? "granted" : "denied");
  window.gtag("consent", "update", {
    ad_storage: state(consent.marketing),
    ad_user_data: state(consent.marketing),
    ad_personalization: state(consent.marketing),
    analytics_storage: state(consent.analytics),
  });

  // Допълнително събитие, ако контейнерът иска да реагира на промяна.
  window.dataLayer.push({
    event: "cookie_consent_update",
    analytics_consent: consent.analytics,
    marketing_consent: consent.marketing,
  });
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
  updateGoogleConsent(value);
  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, { detail: value }),
  );
  return value;
}

// Отваря панела с настройки от произволно място (напр. линк във футъра).
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
