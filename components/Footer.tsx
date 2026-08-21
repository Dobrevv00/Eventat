import { Logo } from "./Header";
import CookieSettingsButton from "./CookieSettingsButton";
import { FOOTER_DEFAULTS, HEADER_DEFAULTS } from "@/lib/defaults";
import type { FooterContent } from "@/lib/content";

type FooterProps = {
  content?: FooterContent;
  logoText?: string;
  logoSubtext?: string;
};

export default function Footer({
  content,
  logoText = HEADER_DEFAULTS.logoText,
  logoSubtext = HEADER_DEFAULTS.logoSubtext,
}: FooterProps) {
  const c = content ?? FOOTER_DEFAULTS;
  const links = c.links?.length ? c.links : FOOTER_DEFAULTS.links;

  return (
    <footer className="bg-white py-[30px] lg:h-[119px] lg:pt-[37px] lg:pb-0">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-[20px] px-[24px] lg:flex-row lg:items-start lg:justify-between">
        <Logo text={logoText} subtext={logoSubtext} />
        <nav className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[10px] text-[14px] leading-[21.7px] text-muted lg:pt-[12px]">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-plum"
            >
              {link.label}
            </a>
          ))}
          <CookieSettingsButton className="transition-colors hover:text-plum">
            {c.cookieSettingsLabel}
          </CookieSettingsButton>
        </nav>
        <p className="text-[13px] leading-[20.15px] text-muted lg:pt-[13px]">
          {c.copyright}
        </p>
      </div>
    </footer>
  );
}
