"use client";

import { openCookieSettings } from "@/lib/cookieConsent";

export default function CookieSettingsButton({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children ?? "Настройки за бисквитки"}
    </button>
  );
}
