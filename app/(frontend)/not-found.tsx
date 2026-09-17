import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getFooterContent, getHeaderContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Страницата не е намерена — EventAT",
};

export default async function NotFound() {
  const [header, footer] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
  ]);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Header content={header} />
      <section
        className="flex flex-1 items-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.95) 0%, rgba(255,235,249,0.9) 100%)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[640px] flex-col items-center px-[24px] py-[80px] text-center lg:py-[120px]">
          <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
            ГРЕШКА 404
          </p>
          <h1 className="mt-[12px] text-[32px] font-bold italic leading-[38px] tracking-[-0.5px] text-ink lg:text-[40px] lg:leading-[46px]">
            Страницата не е намерена
          </h1>
          <p className="mt-[14px] max-w-[480px] text-[16px] leading-[25px] text-muted">
            Възможно е линкът да е грешен или страницата да е преместена.
            Разгледай услугите ни или се върни към началото.
          </p>
          <div className="mt-[28px] flex w-full flex-col gap-[12px] sm:w-auto sm:flex-row">
            <a
              href="/"
              className="fx-btn flex h-[50px] w-full items-center justify-center rounded-[12px] bg-violet px-[24px] text-[15px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] sm:w-auto"
            >
              Към началната страница
            </a>
            <a
              href="/uslugi"
              className="fx-btn-soft flex h-[50px] w-full items-center justify-center rounded-[12px] border border-line bg-white px-[24px] text-[15px] font-bold italic text-plum sm:w-auto"
            >
              Виж услугите
            </a>
          </div>
        </div>
      </section>
      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
