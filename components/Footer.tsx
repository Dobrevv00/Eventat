import { Logo } from "./Header";
import CookieSettingsButton from "./CookieSettingsButton";

const LINKS = [
  { label: "Поверителност", href: "/poveritelnost" },
  { label: "Условия", href: "#" },
  { label: "Контакти", href: "/kontakti" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-[30px] lg:h-[119px] lg:pt-[37px] lg:pb-0">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-[20px] px-[24px] lg:flex-row lg:items-start lg:justify-between">
        <Logo />
        <nav className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[10px] text-[14px] leading-[21.7px] text-muted lg:pt-[12px]">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-plum"
            >
              {link.label}
            </a>
          ))}
          <CookieSettingsButton className="transition-colors hover:text-plum" />
        </nav>
        <p className="text-[13px] leading-[20.15px] text-muted lg:pt-[13px]">
          © 2026 EventAT. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
