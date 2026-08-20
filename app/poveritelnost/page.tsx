import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "Политика за поверителност — EventAT",
  description:
    "Как EventAT (ЧЕРИ ЕСТЕЙТ ЕООД) събира, използва и защитава личните ти данни.",
};

const LAST_UPDATED = "20 август 2026 г.";

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

export default function PoveritelnostPage() {
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
            Политика за поверителност
          </h1>
          <p className="mt-[12px] text-[15px] leading-[23px] text-muted">
            Последна актуализация: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="flex-1">
        <article className="mx-auto w-full max-w-[820px] px-[24px] pt-[40px] pb-[72px]">
          <Paragraph>
            Тази политика обяснява как събираме, използваме и защитаваме
            личните ти данни, когато посещаваш сайта на EventAT или използваш
            нашите форми. Ценим доверието ти и обработваме данните ти в
            съответствие с Общия регламент за защита на данните (GDPR) и
            приложимото българско законодателство.
          </Paragraph>

          <SectionTitle>1. Администратор на лични данни</SectionTitle>
          <Paragraph>
            Администратор на личните ти данни е:
          </Paragraph>
          <div className="mt-[14px] rounded-[14px] border border-line bg-white p-[20px] shadow-[0px_6px_18px_0px_rgba(102,77,146,0.06)]">
            <p className="text-[15px] leading-[24px] text-ink">
              <span className="font-bold italic">„ЧЕРИ ЕСТЕЙТ" ЕООД</span>
              <br />
              ЕИК: 202013913
              <br />
              Седалище и адрес на управление: България, гр. София, кв.
              „Лозенец", ул. „Свети Наум" №30
              <br />
              Представлявано от: Моника Георгиева Ковачева
              <br />
              Имейл за контакт:{" "}
              <a
                href="mailto:hello.eventat@gmail.com"
                className="text-plum underline transition-colors hover:text-violet"
              >
                hello.eventat@gmail.com
              </a>
            </p>
          </div>

          <SectionTitle>2. Какви данни събираме</SectionTitle>
          <Paragraph>
            Събираме само данните, които са ни необходими, за да предоставяме
            услугата:
          </Paragraph>
          <List
            items={[
              <>
                <span className="font-semibold text-ink">
                  Данни, които ни предоставяш доброволно
                </span>{" "}
                — име и имейл адрес чрез формата за записване в листата или
                контактната форма, както и избраните от теб отговори (тип
                събитие, услуги, градове и др.).
              </>,
              <>
                <span className="font-semibold text-ink">
                  Данни за изпълнители
                </span>{" "}
                — при заявка „Предлагам услуга" можем да съберем уебсайт и
                информация за предлаганите услуги и градове.
              </>,
              <>
                <span className="font-semibold text-ink">
                  Технически данни
                </span>{" "}
                — IP адрес, тип браузър и устройство, страници, които
                посещаваш, събирани автоматично чрез бисквитки и подобни
                технологии.
              </>,
            ]}
          />

          <SectionTitle>3. Цели и правно основание</SectionTitle>
          <Paragraph>Обработваме данните ти, за да:</Paragraph>
          <List
            items={[
              "отговаряме на запитвания и да те уведомим за старта на платформата (на база твоето съгласие);",
              "предоставяме и подобряваме услугите и съдържанието на сайта (на база нашия легитимен интерес);",
              "изпълняваме законови задължения, когато е приложимо.",
            ]}
          />

          <SectionTitle>4. Бисквитки</SectionTitle>
          <Paragraph>
            Използваме бисквитки, за да работи сайтът правилно и, с твое
            съгласие, за анализ и маркетинг. Разделяме ги на три категории:
            необходими (винаги активни), аналитични и маркетингови. Можеш да
            промениш избора си по всяко време.
          </Paragraph>
          <div className="mt-[16px]">
            <CookieSettingsButton className="inline-flex h-[46px] items-center justify-center rounded-[12px] bg-violet px-[22px] text-[14px] font-bold italic text-white drop-shadow-[0px_6px_9px_rgba(127,100,174,0.35)] transition-colors hover:bg-plum">
              Настройки за бисквитки
            </CookieSettingsButton>
          </div>

          <SectionTitle>5. Споделяне на данни</SectionTitle>
          <Paragraph>
            Не продаваме личните ти данни. Можем да ги споделяме само с
            доставчици на услуги, които ни помагат да поддържаме сайта (напр.
            хостинг, имейл и аналитични инструменти), при строги договорни
            гаранции, както и с компетентни органи, когато това се изисква по
            закон.
          </Paragraph>

          <SectionTitle>6. Срок на съхранение</SectionTitle>
          <Paragraph>
            Съхраняваме данните ти само толкова дълго, колкото е необходимо за
            целите, за които са събрани, или докато оттеглиш съгласието си.
            След това ги изтриваме или анонимизираме.
          </Paragraph>

          <SectionTitle>7. Твоите права</SectionTitle>
          <Paragraph>Съгласно GDPR имаш право да:</Paragraph>
          <List
            items={[
              "получиш достъп до личните си данни и копие от тях;",
              "поискаш коригиране на неточни данни;",
              "поискаш изтриване („правото да бъдеш забравен“);",
              "ограничиш или възразиш срещу обработването;",
              "оттеглиш съгласието си по всяко време;",
              "подадеш жалба до Комисията за защита на личните данни (КЗЛД).",
            ]}
          />
          <Paragraph>
            За да упражниш някое от тези права, пиши ни на{" "}
            <a
              href="mailto:hello.eventat@gmail.com"
              className="text-plum underline transition-colors hover:text-violet"
            >
              hello.eventat@gmail.com
            </a>
            .
          </Paragraph>

          <SectionTitle>8. Сигурност</SectionTitle>
          <Paragraph>
            Прилагаме подходящи технически и организационни мерки, за да
            защитим данните ти от неоторизиран достъп, загуба или
            злоупотреба.
          </Paragraph>

          <SectionTitle>9. Промени в политиката</SectionTitle>
          <Paragraph>
            Можем да актуализираме тази политика периодично. Актуалната версия
            винаги ще е достъпна на тази страница с обновена дата.
          </Paragraph>

          <SectionTitle>10. Контакт</SectionTitle>
          <Paragraph>
            За въпроси относно тази политика или обработването на личните ти
            данни се свържи с нас на{" "}
            <a
              href="mailto:hello.eventat@gmail.com"
              className="text-plum underline transition-colors hover:text-violet"
            >
              hello.eventat@gmail.com
            </a>{" "}
            или на посочения по-горе адрес.
          </Paragraph>
        </article>
      </div>

      <Footer />
    </main>
  );
}
