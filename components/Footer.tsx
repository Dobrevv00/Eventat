import { Logo } from "./Header";

const LINKS = [
  { label: "Поверителност", href: "#" },
  { label: "Условия", href: "#" },
  { label: "Контакти", href: "/kontakti" },
];

export default function Footer() {
  return (
    <footer className="bg-white py-[30px] lg:h-[119px] lg:pt-[37px] lg:pb-0">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-[20px] px-[24px] lg:flex-row lg:items-start lg:justify-between">
        <Logo />
        <nav className="flex items-center gap-[32px] text-[14px] leading-[21.7px] text-muted lg:pt-[12px]">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition-colors hover:text-plum"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-[13px] leading-[20.15px] text-muted lg:pt-[13px]">
          © 2026 EventAT. Всички права запазени.
        </p>
      </div>
    </footer>
  );
}
