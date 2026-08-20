import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Общи условия — EventAT",
  description:
    "Общите условия за ползване на сайта EventAT (ЧЕРИ ЕСТЕЙТ ЕООД) и за записване в листата на чакащите.",
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

export default function UsloviyaPage() {
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
            Тези общи условия уреждат ползването на сайта EventAT и записването
            в листата на чакащите. Като използваш сайта, ти приемаш условията
            по-долу. Ако не си съгласен с тях, моля не използвай сайта.
          </Paragraph>

          <SectionTitle>1. Кой стои зад EventAT</SectionTitle>
          <Paragraph>Сайтът се поддържа от:</Paragraph>
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

          <SectionTitle>2. Какво представлява платформата в момента</SectionTitle>
          <Paragraph>
            EventAT е в етап преди официалния си старт. В момента сайтът има
            информационен характер и служи за представяне на бъдещата платформа
            и за събиране на заявки за ранен достъп.
          </Paragraph>
          <List
            items={[
              "през сайта не се сключват договори за услуги и не се извършват плащания;",
              "не се правят резервации и не се поемат ангажименти към конкретни изпълнители;",
              "описаните функционалности отразяват планирано развитие и могат да се променят до старта.",
            ]}
          />

          <SectionTitle>3. Записване в листата на чакащите</SectionTitle>
          <Paragraph>
            Можеш да се запишеш като клиент („Планирам събитие") или като
            изпълнител („Предлагам услуга"). Записването е безплатно и не те
            обвързва с нищо.
          </Paragraph>
          <List
            items={[
              "предоставяш данните си доброволно и потвърждаваш, че са верни и актуални;",
              "записването не гарантира достъп до платформата, нито срок, в който ще стартира;",
              "можеш да поискаш заличаване на заявката си по всяко време на посочения имейл.",
            ]}
          />

          <SectionTitle>4. Изпълнители</SectionTitle>
          <Paragraph>
            Заявката за присъединяване като изпълнител е покана за преговори, а
            не сключен договор. Условията за участие, комисионите и правилата за
            работа ще бъдат уредени в отделен договор преди старта на
            платформата.
          </Paragraph>
          <Paragraph>
            Запазваме си правото да откажем или прекратим заявка, когато данните
            са непълни, неверни или дейността противоречи на закона.
          </Paragraph>

          <SectionTitle>5. Правила за ползване</SectionTitle>
          <Paragraph>Когато използваш сайта, се задължаваш да не:</Paragraph>
          <List
            items={[
              "подаваш чужди лични данни без съгласие или неверни данни;",
              "нарушаваш работата на сайта, включително чрез автоматизирани заявки, опити за проникване или зловреден код;",
              "копираш или използваш съдържанието на сайта с търговска цел без наше писмено съгласие.",
            ]}
          />

          <SectionTitle>6. Интелектуална собственост</SectionTitle>
          <Paragraph>
            Марката EventAT, логото, текстовете, дизайнът и графичните елементи
            на сайта са защитени и остават собственост на „ЧЕРИ ЕСТЕЙТ" ЕООД или
            на съответните им носители на права. Ползването на сайта не ти
            предоставя права върху тях.
          </Paragraph>

          <SectionTitle>7. Ограничение на отговорността</SectionTitle>
          <Paragraph>
            Полагаме разумни усилия информацията на сайта да е точна и достъпна,
            но не гарантираме непрекъсваема работа или липса на технически
            грешки. Не носим отговорност за вреди, произтичащи от временна
            недостъпност на сайта или от решения, взети единствено въз основа на
            публикуваната тук информация.
          </Paragraph>

          <SectionTitle>8. Връзки към външни сайтове</SectionTitle>
          <Paragraph>
            Сайтът може да съдържа връзки към сайтове на трети страни. Нямаме
            контрол върху тяхното съдържание и не носим отговорност за него.
          </Paragraph>

          <SectionTitle>9. Лични данни и бисквитки</SectionTitle>
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

          <SectionTitle>10. Промени в условията</SectionTitle>
          <Paragraph>
            Можем да актуализираме тези условия, включително при старта на
            платформата. Актуалната версия винаги ще е достъпна на тази страница
            с обновена дата.
          </Paragraph>

          <SectionTitle>11. Приложимо право</SectionTitle>
          <Paragraph>
            За тези условия се прилага българското законодателство. Споровете се
            решават по взаимно съгласие, а при невъзможност — от компетентния
            български съд. Като потребител можеш да се обърнеш и към Комисията
            за защита на потребителите или към платформата за онлайн решаване на
            спорове на Европейската комисия.
          </Paragraph>

          <SectionTitle>12. Контакт</SectionTitle>
          <Paragraph>
            За въпроси по тези условия ни пиши на{" "}
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
