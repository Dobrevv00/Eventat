// Изпращане на събития към dataLayer (Google Tag Manager).
// GTM снипетът се зарежда в app/layout.tsx — тук само подаваме събитията,
// които контейнерът GTM-5RDG9GVR слуша:
//   • generate_lead        — записване в листата (waitlist формата)
//   • contact_form_submit  — контактната форма
// Стойностите на dataLayer променливите са: form_id, form_side, event_type,
// first_service, discovery_source, pain_points, page_path.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 приема до 100 символа за стойност на параметър.
const MAX_PARAM_LENGTH = 100;

/**
 * Обединява множествен избор в един параметър. Разделителят е " | ", защото
 * някои опции сами съдържат запетая (напр. "Музиканти, певци и DJ").
 */
export function joinSelections(values: string[] | undefined): string {
  if (!values || values.length === 0) return "";
  const joined = values.join(" | ");
  return joined.length > MAX_PARAM_LENGTH
    ? `${joined.slice(0, MAX_PARAM_LENGTH - 1)}…`
    : joined;
}

export function pushEvent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    page_path: window.location.pathname,
    ...payload,
  });
}
