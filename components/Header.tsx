"use client";

import { useState } from "react";

function Logo() {
  return (
    <a href="/" className="group relative block font-noto leading-none">
      <p className="text-[27.68px] font-bold tracking-[1.26px] text-plum transition-colors duration-200 group-hover:text-violet">
        EVENTAT
      </p>
      <p className="mt-[2.5px] ml-[1.3px] text-[8.93px] tracking-[3.15px] text-lilac transition-colors duration-200 group-hover:text-violet">
        PLAN YOUR EVENT
      </p>
    </a>
  );
}

export { Logo };

const NAV_ITEMS = [
  "Как работи",
  "Услуги",
  "Поводи",
  "За изпълнители",
  "Контакти",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-[68px] w-full max-w-[1210px] items-center justify-between px-[20px]">
        <Logo />
        <nav className="hidden items-center gap-[30px] text-[14px] text-ink lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              className="relative whitespace-nowrap py-[4px] transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-violet after:transition-all after:duration-300 hover:text-plum hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-[10px]">
          <button
            aria-label="Любими"
            className="size-[32px] rounded-[8.4px] border-[0.84px] border-line text-center font-sans text-[13.45px] text-plum transition-colors hover:border-lilac hover:bg-[#f4eff5]"
          >
            ♡
          </button>
          <a
            href="#"
            className="hidden h-[40px] items-center justify-center rounded-[10px] bg-violet px-[19px] font-jakarta text-[11.77px] font-semibold text-white drop-shadow-[0px_5px_7.6px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum sm:flex"
          >
            Добави услуга
          </a>
          <button
            aria-label="Меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="size-[32px] rounded-[8.4px] text-center font-sans text-[16.8px] text-plum transition-colors hover:bg-[#f4eff5]"
          >
            ☰
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="flex flex-col border-t border-line bg-white px-[24px] py-[10px] lg:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="rounded-[8px] px-[10px] py-[10px] text-[15px] text-ink transition-colors hover:bg-[#f4eff5] hover:text-plum"
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="mt-[6px] mb-[8px] flex h-[44px] items-center justify-center rounded-[10px] bg-violet font-jakarta text-[13px] font-semibold text-white transition-colors hover:bg-plum sm:hidden"
          >
            Добави услуга
          </a>
        </nav>
      )}
    </header>
  );
}
