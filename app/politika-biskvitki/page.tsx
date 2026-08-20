import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Политика за бисквитки — EventAT",
  description:
    "Какви бисквитки използва EventAT, за какво служат и как да управляваш своя избор.",
};

const LAST_UPDATED = "20 август 2026 г.";

const COOKIE_ROWS = [
  {
    category: "Необходими",
    purpose:
      "Основна работа на сайта, сигурност и запазване на избора ти за бисквитки.",
    example: "eventat-cookie-consent",
    duration: "до 12 месеца",
  },
  {
    category: "Аналитични",
    purpose:
      "Анонимна и обобщена статистика за това как посетителите използват сайта.",
    example: "напр. _ga, _gid (Google Analytics)",
    duration: "до 24 месеца",
  },
  {
    category: "Маркетингови",
    purpose:
      "Показване на по-подходящи съобщения и оферти в други платформи.",
    example: "напр. _fbp (Meta), Google Ads",
    duration: "до 12 месеца",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-[36px] text-[22px] font-bold italic leading-[28px] text-ink lg:text-[24px]">
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-[12px] text-[15px] leading-[24px] text-muted">{children}</p>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-[12px] flex flex-col gap-[8px]">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-[10px] text-[15px] leading-[23px] text-muted"
        >
          <span className="mt-[8px] size-[6px] shrink-0 rounded-full bg-lilac" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PolitikaBiskvitkiPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Header />

      <section
        className="border-b border-line"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(253,246,246,0.95) 0%, rgba(255,235,249,0.85) 100%)",
        }}
      >
        <div className="mx-auto w-full max-w-[820px] px-[24px] pt-[40px] pb-[36px]">
          <p className="text-[12px] leading-[14px] tracking-[2px] text-plum">
            ПРАВНА ИНФОРМАЦИЯ
          </p>
          <h1 className="mt-[12px] text-[32px] font-bold italic leading-[38px] tracking-[-0.5px] text-ink lg:text-[40px] lg:leading-[44px]">
            Политика за бисквитки
          </h1>
          <p className="mt-[12px] text-[15px] leading-[23px] text-muted">
            Последна актуализация: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="flex-1">
        <article className="mx-auto w-full max-w-[820px] px-[24px] pt-[40px] pb-[72px]">
          <Paragraph>
            Тази политика обяснява какви бисквитки използваме на сайта на
            EventAT, за какво служат и как можеш да управляваш своя избор. Тя
            допълва нашата{" "}
            <a
              href="/poveritelnost"
              className="text-plum underline transition-colors hover:text-violet"
            >
              Политика за поверителност
            </a>
            .
          </Paragraph>

          <SectionTitle>1. Какво представляват бисквитките</SectionTitle>
          <Paragraph>
            Бисквитките са малки текстови файлове, които се съхраняват на
            твоето устройство, когато посещаваш уебсайт. Те позволяват на сайта
            да запомни твои действия и предпочитания за определен период от
            време. Използваме и подобни технологии (напр. local storage) със
            същата цел.
          </Paragraph>

          <SectionTitle>2. Защо използваме бисквитки</SectionTitle>
          <Paragraph>Използваме бисквитки, за да:</Paragraph>
          <List
            items={[
              "осигурим правилната и сигурна работа на сайта;",
              "запомним избора ти за съгласие за бисквитки;",
              "разбираме как се използва сайтът и да го подобряваме (с твое съгласие);",
              "ти показваме по-подходящо съдържание и оферти (с твое съгласие).",
            ]}
          />

          <SectionTitle>3. Видове бисквитки, които използваме</SectionTitle>
          <Paragraph>
            Аналитичните и маркетинговите бисквитки се зареждат само след като
            дадеш съгласие. Необходимите са винаги активни.
          </Paragraph>
          <div className="mt-[16px] overflow-x-auto rounded-[14px] border border-line">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="bg-[#f4eff5]">
                  <th className="px-[16px] py-[12px] text-[13px] font-bold italic text-ink">
                    Категория
                  </th>
                  <th className="px-[16px] py-[12px] text-[13px] font-bold italic text-ink">
                    Цел
                  </th>
                  <th className="px-[16px] py-[12px] text-[13px] font-bold italic text-ink">
                    Пример
                  </th>
                  <th className="px-[16px] py-[12px] text-[13px] font-bold italic text-ink">
                    Срок
                  </th>
                </tr>
              </thead>
              <tbody>
                {COOKIE_ROWS.map((row) => (
                  <tr
                    key={row.category}
                    className="border-t border-line align-top"
                  >
                    <td className="px-[16px] py-[14px] text-[14px] font-semibold text-plum">
                      {row.category}
                    </td>
                    <td className="px-[16px] py-[14px] text-[14px] leading-[20px] text-muted">
                      {row.purpose}
                    </td>
                    <td className="px-[16px] py-[14px] text-[14px] leading-[20px] text-muted">
                      {row.example}
                    </td>
                    <td className="whitespace-nowrap px-[16px] py-[14px] text-[14px] text-muted">
                      {row.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SectionTitle>4. Бисквитки от трети страни</SectionTitle>
          <Paragraph>
            Някои бисквитки могат да се задават от доверени доставчици на услуги
            (напр. инструменти за анализ или реклама), които ни помагат да
            подобряваме сайта. Тези доставчици обработват данните съгласно
            собствените си политики за поверителност. Такива бисквитки се
            зареждат само с твое съгласие.
          </Paragraph>

          <SectionTitle>5. Как да управляваш бисквитките</SectionTitle>
          <Paragraph>
            Можеш да промениш или оттеглиш съгласието си по всяко време чрез
            бутона по-долу. Освен това повечето браузъри позволяват да
            блокираш или изтриеш бисквитки от настройките си — имай предвид, че
            изключването на някои бисквитки може да ограничи работата на сайта.
          </Paragraph>
          <div className="mt-[16px]">
            <CookieSettingsButton className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-violet px-[22px] text-[14px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum">
              Настройки за бисквитки
            </CookieSettingsButton>
          </div>

          <SectionTitle>6. Промени в политиката</SectionTitle>
          <Paragraph>
            Можем да актуализираме тази политика периодично. Актуалната версия
            винаги ще е достъпна на тази страница с обновена дата.
          </Paragraph>

          <SectionTitle>7. Контакт</SectionTitle>
          <Paragraph>
            За въпроси относно използването на бисквитки се свържи с
            администратора на данните — „ЧЕРИ ЕСТЕЙТ" ЕООД (ЕИК 202013913), гр.
            София, кв. „Лозенец", ул. „Свети Наум" №30, на{" "}
            <a
              href="mailto:hello.eventat@gmail.com"
              className="text-plum underline transition-colors hover:text-violet"
            >
              hello.eventat@gmail.com
            </a>
            .
          </Paragraph>
        </article>
      </div>

      <Footer />
    </main>
  );
}
