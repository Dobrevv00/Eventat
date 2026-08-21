/**
 * Текущото съдържание на сайта, извлечено дословно от компонентите.
 *
 * Този файл има двойна роля:
 *  1. Начални стойности при seed на Payload (виж lib/seed/run.ts).
 *  2. Fallback за компонентите, ако CMS поле липсва или базата е недостъпна —
 *     така сайтът никога не остава празен и не се чупи.
 *
 * Размерите в px (widths) НЕ се управляват от CMS — те са дизайнерски
 * стойности и остават тук, съпоставени по индекс.
 */

export const HEADER_DEFAULTS = {
  logoText: "EVENTAT",
  logoSubtext: "PLAN YOUR EVENT",
  navItems: [
    { label: "Как работи", href: "/#kak-raboti" },
    { label: "Услуги", href: "/#uslugi" },
    { label: "Поводи", href: "/#uslugi" },
    { label: "За изпълнители", href: "/#form-offer" },
    { label: "Контакти", href: "/kontakti" },
  ],
  ctaLabel: "Добави услуга",
  ctaHref: "/#form-offer",
  showFavorites: true,
};

export const FOOTER_DEFAULTS = {
  links: [
    { label: "Поверителност", href: "/poveritelnost" },
    { label: "Бисквитки", href: "/politika-biskvitki" },
    { label: "Общи условия", href: "/obshti-usloviya" },
    { label: "Контакти", href: "/kontakti" },
  ],
  cookieSettingsLabel: "Настройки за бисквитки",
  copyright: "© 2026 EventAT. Всички права запазени.",
};

export const SITE_SETTINGS_DEFAULTS = {
  siteName: "EventAT",
  metaTitle: "EventAT — Планирай своето събитие",
  metaDescription:
    "Резервирай проверени изпълнители за сватби, рождени дни и корпоративни събития със сигурни плащания през платформата.",
  contactEmail: "hello.eventat@gmail.com",
  contactAddress: "гр. София, бул. Свети Наум 30, етаж 5",
};

export const HOME_DEFAULTS = {
  hero: {
    headingLine1: "Твоето следващо",
    headingHighlight: "незабравимо събитие",
    headingSuffix: "започва тук",
    subtitle:
      "Резервирай проверени изпълнители за сватби, рождени дни и корпоративни събития DJ-и, танцьори, певци, фотографи и още, със сигурни плащания през платформата.",
    primaryCtaLabel: "Планирам събитие",
    primaryCtaHref: "#form-plan",
    secondaryCtaLabel: "Предлагам услуги",
    secondaryCtaHref: "#form-offer",
  },
  servicesSection: {
    eyebrow: "УСЛУГИ",
    title: "За всеки специален момент",
    subtitle:
      "От професионални DJ-и до елегантна украса - намери перфектния избор за твоето събитие.",
  },
  processSection: {
    eyebrow: "ЛЕСЕН ПРОЦЕС",
    title: "От идея до празнуване",
    subtitle: "Четири стъпки между теб и перфектно организираното събитие.",
    steps: [
      {
        number: "01",
        title: "Открий",
        text: "Разгледай изпълнители и услуги, подходящи за твоя празник.",
      },
      {
        number: "02",
        title: "Свържи се",
        text: "Говори директно с изпълнителя, обсъди визията си и получи персонална оферта.",
      },
      {
        number: "03",
        title: "Резервирай",
        text: "Плати през EventAT със защита на купувача - парите ти са в безопасност до събитието.",
      },
      {
        number: "04",
        title: "Празнувай",
        text: "Наслади се на перфектно изпълненото събитие, спокойно и без стрес.",
      },
    ],
  },
  whyUsSection: {
    eyebrow: "ЗАЩО EVENTAT",
    title: "Изградено за доверие и спокойствие",
    subtitle:
      "Поемаме трудната част, за да можеш да се съсредоточиш върху момента.",
    features: [
      {
        icon: "payments",
        title: "Сигурни плащания",
        text: "Всяка транзакция минава през платформата със защита на купувача и изпълнителя.",
      },
      {
        icon: "verified",
        title: "Проверени изпълнители",
        text: "Всеки изпълнител е внимателно одобрен за качество и професионализъм.",
      },
      {
        icon: "pricing",
        title: "Прозрачни цени",
        text: "Без скрити такси. Ясни цени отначало и персонализирани оферти при нужда.",
      },
      {
        icon: "booking",
        title: "Бърза резервация",
        text: "Виж свободни дати в реално време и запази своята за минути.",
      },
      {
        icon: "quality",
        title: "Куратирано качество",
        text: "Подбрани изпълнители с доказана работа и реален опит.",
      },
      {
        icon: "support",
        title: "Спокойствие за деня",
        text: "Подкрепа преди и по време на събитието - никога не си сам.",
      },
    ],
  },
  joinCta: {
    headingPrefix: "Стани част от",
    headingHighlight: "EventAT",
    subtitle:
      "Подсигури си ранен достъп, ексклузивни условия и приоритет пред всички, които ще се присъединят след старта.",
    badgeStrong: "500+ души",
    badgeRest: " вече се записаха",
    perks: [
      { text: "Ексклузивни условия при стартирането" },
      { text: "Приоритет пред всички следващи регистрации" },
      { text: "Изненади и оферти само за нашата общност" },
    ],
    formEyebrow: "ЗАПИШИ СЕ БЕЗПЛАТНО",
    formTitle: "Резервирай своето място",
    tabPlanLabel: "Планирам събитие",
    tabOfferLabel: "Предлагам услуга",
    nameLabel: "Име",
    namePlaceholder: "Твоето име",
    emailLabel: "Имейл",
    emailPlaceholder: "ime@example.com",
    websiteLabel: "Уебсайт",
    websitePlaceholder: "https://",
    optInLabel:
      "Желая да получа ранен достъп до EventAT и специални предложения при старта.",
    submitLabel: "Запиши се в листата",
    formDisclaimer: "Никога няма да изпратим спам. Само новина за старта.",
    successTitle: "Ти си в листата!",
    successText:
      "Благодарим ти! Ще те уведомим първи, когато EventAT стартира.",
  },
  newsletter: {
    title: "Идеи за следващото ти събитие",
    subtitle: "Кратък месечен бюлетин - тенденции, реални примери и съвети.",
    placeholder: "Имейл адрес",
    buttonLabel: "Абонирай се",
    disclaimer: "Без спам. Отпиши се по всяко време.",
  },
};

export const SERVICES_PAGE_DEFAULTS = {
  breadcrumbLabel: "Услуги",
  eyebrow: "УСЛУГА",
  primaryCtaLabel: "Планирам събитие",
  primaryCtaHref: "/#form-plan",
  secondaryCtaLabel: "Всички услуги",
  secondaryCtaHref: "/#uslugi",
  includesEyebrow: "КАКВО ВКЛЮЧВА",
  includesTitlePrefix: "Всичко за",
  whyEyebrow: "ЗАЩО ПРЕЗ EVENTAT",
  whyTitle: "Спокойствие на всяка стъпка",
  bottomCtaTitlePrefix: "Готов ли си за",
  bottomCtaSubtitle:
    "Запиши се в листата и бъди сред първите, които ще резервират проверени изпълнители през EventAT.",
  bottomCtaButtonLabel: "Резервирай своето място",
  bottomCtaButtonHref: "/#form-plan",
};

export const CONTACTS_PAGE_DEFAULTS = {
  eyebrow: "КОНТАКТИ",
  title: "Свържи се с нас",
  subtitle: "Пиши ни за въпроси, партньорства или просто да кажеш здравей.",
  infoCardTitle: "Информация за контакт",
  addressLabel: "АДРЕС",
  emailLabel: "ИМЕЙЛ",
  responseNote: "Отговаряме обикновено в рамките на един работен ден.",
  nameLabel: "Име",
  namePlaceholder: "Твоето име",
  emailFieldLabel: "Имейл",
  emailPlaceholder: "ime@example.com",
  messageLabel: "Съобщение",
  messagePlaceholder: "Как можем да помогнем?",
  submitLabel: "Изпрати съобщение",
  successTitle: "Благодарим ти!",
  successText:
    "Получихме съобщението ти и ще се свържем с теб възможно най-скоро.",
};

/** Дизайнерски ширини (px) по индекс — не се управляват от CMS. */
export const PROCESS_STEP_WIDTHS = [197, 243, 243, 229];
export const WHY_US_FEATURE_WIDTHS = [227, 242, 201, 217, 220, 205];

/** Иконите са UI активи в /public и се избират от фиксиран списък. */
export const FEATURE_ICONS: Record<string, string> = {
  payments: "/images/icon-payments.svg",
  verified: "/images/icon-verified.svg",
  pricing: "/images/icon-pricing.svg",
  booking: "/images/icon-booking.svg",
  quality: "/images/icon-quality.svg",
  support: "/images/icon-support.svg",
};

export const HERO_FALLBACK_IMAGE = "/images/hero-bg.jpg";
