import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getFooterContent, getHeaderContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Общи условия — EventAT",
  description:
    "Общи условия за ползване на платформата EventAT, оперирана от „ЧЕРИ ЕСТЕЙТ“ ЕООД.",
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

export default async function ObshtiUsloviyaPage() {
  const [header, footer] = await Promise.all([
    getHeaderContent(),
    getFooterContent(),
  ]);

  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-white">
      <Header content={header} />

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
            Общи условия
          </h1>
          <p className="mt-[12px] text-[15px] leading-[23px] text-muted">
            Последна актуализация: {LAST_UPDATED}
          </p>
        </div>
      </section>

      <div className="flex-1">
        <article className="mx-auto w-full max-w-[820px] px-[24px] pt-[40px] pb-[72px]">
          <Paragraph>
            Настоящите Общи условия уреждат ползването на уебсайта и
            платформата EventAT. С достъпа до сайта и използването на неговите
            форми и услуги приемаш тези условия. Ако не си съгласен с тях, моля
            не използвай сайта.
          </Paragraph>

          <SectionTitle>1. Данни за дружеството</SectionTitle>
          <Paragraph>
            Платформата EventAT се оперира от:
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

          <SectionTitle>2. Определения</SectionTitle>
          <List
            items={[
              <>
                <span className="font-semibold text-ink">Платформа</span> —
                уебсайтът EventAT и всички негови функционалности.
              </>,
              <>
                <span className="font-semibold text-ink">Потребител</span> —
                всяко лице, което посещава сайта или използва неговите форми.
              </>,
              <>
                <span className="font-semibold text-ink">Изпълнител</span> —
                лице или дружество, което предлага услуги за събития през
                платформата.
              </>,
              <>
                <span className="font-semibold text-ink">Клиент</span> — лице,
                което търси и резервира услуги за своето събитие.
              </>,
            ]}
          />

          <SectionTitle>3. Предмет на услугата</SectionTitle>
          <Paragraph>
            EventAT е платформа, която свързва клиенти с изпълнители на услуги
            за събития. Към момента платформата е в подготвителен етап и
            предоставя възможност за записване в лист на чакащите и за контакт
            с екипа.
          </Paragraph>
          <Paragraph>
            EventAT действа като посредник и не е страна по договорите между
            клиенти и изпълнители, освен ако изрично не е посочено друго.
          </Paragraph>

          <SectionTitle>4. Регистрация и предоставена информация</SectionTitle>
          <Paragraph>
            При попълване на форма в сайта се задължаваш да предоставяш вярна,
            точна и актуална информация. Носиш отговорност за съдържанието,
            което подаваш, включително за данните за предлаганите от теб услуги,
            ако се регистрираш като изпълнител.
          </Paragraph>

          <SectionTitle>5. Задължения на потребителите</SectionTitle>
          <Paragraph>При ползване на платформата не се допуска:</Paragraph>
          <List
            items={[
              "нарушаване на действащото законодателство или правата на трети лица;",
              "предоставяне на неверни, подвеждащи или чужди данни;",
              "опити за нерегламентиран достъп, претоварване или увреждане на платформата;",
              "използване на съдържанието на сайта с търговска цел без разрешение;",
              "публикуване на обидно, дискриминационно или незаконно съдържание.",
            ]}
          />

          <SectionTitle>6. Отношения между клиенти и изпълнители</SectionTitle>
          <Paragraph>
            Договорът за конкретна услуга се сключва пряко между клиента и
            изпълнителя. Изпълнителят отговаря за качеството, срока и начина на
            изпълнение на своята услуга, както и за съответствието ѝ с
            договореното.
          </Paragraph>
          <Paragraph>
            EventAT полага усилия да проверява изпълнителите, но не гарантира и
            не носи отговорност за действията или бездействията им, освен в
            предвидените от закона случаи.
          </Paragraph>

          <SectionTitle>7. Цени и плащания</SectionTitle>
          <Paragraph>
            Цените на услугите се определят от съответните изпълнители. Когато
            платформата предоставя възможност за плащане, условията, таксите и
            начините за възстановяване на суми ще бъдат ясно посочени преди
            потвърждаване на резервацията.
          </Paragraph>

          <SectionTitle>8. Интелектуална собственост</SectionTitle>
          <Paragraph>
            Всички елементи на сайта — текстове, лого, дизайн, графики и
            софтуер — са обект на закрила и са собственост на „ЧЕРИ ЕСТЕЙТ"
            ЕООД или на съответните правоносители. Копирането,
            разпространението или преработването им без изрично писмено
            съгласие е забранено.
          </Paragraph>

          <SectionTitle>9. Ограничаване на отговорността</SectionTitle>
          <Paragraph>
            Платформата се предоставя „във вида, в който е". Полагаме разумни
            усилия за нейната достъпност и коректност, но не гарантираме
            непрекъсната работа без грешки. Не носим отговорност за косвени
            вреди или пропуснати ползи, произтичащи от ползването на сайта, в
            рамките на допустимото от закона.
          </Paragraph>

          <SectionTitle>10. Лични данни и бисквитки</SectionTitle>
          <Paragraph>
            Обработването на лични данни е описано в{" "}
            <a
              href="/poveritelnost"
              className="text-plum underline transition-colors hover:text-violet"
            >
              Политиката за поверителност
            </a>
            , а използването на бисквитки — в{" "}
            <a
              href="/politika-biskvitki"
              className="text-plum underline transition-colors hover:text-violet"
            >
              Политиката за бисквитки
            </a>
            .
          </Paragraph>

          <SectionTitle>11. Промени в условията</SectionTitle>
          <Paragraph>
            Запазваме си правото да актуализираме тези Общи условия. Актуалната
            версия винаги е достъпна на тази страница с обновена дата.
            Продължавайки да използваш сайта след промяна, приемаш новата
            редакция.
          </Paragraph>

          <SectionTitle>12. Приложимо право и спорове</SectionTitle>
          <Paragraph>
            За неуредените въпроси се прилага българското законодателство.
            Споровете се решават чрез преговори, а при непостигане на съгласие —
            от компетентния български съд. Потребителите имат право да сезират
            Комисията за защита на потребителите или да ползват платформата за
            онлайн решаване на спорове на Европейската комисия.
          </Paragraph>

          <SectionTitle>13. Контакт</SectionTitle>
          <Paragraph>
            За въпроси относно тези Общи условия ни пиши на{" "}
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

      <Footer
        content={footer}
        logoText={header.logoText}
        logoSubtext={header.logoSubtext}
      />
    </main>
  );
}
