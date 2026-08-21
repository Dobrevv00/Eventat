/**
 * Въпросите и опциите на формата в Join CTA секцията.
 *
 * Изнесени тук БЕЗ никаква промяна в съдържанието, за да са един и същ
 * източник за:
 *   • components/JoinCta.tsx (визуализация и client валидация)
 *   • collections/EventPlanningSubmissions.ts и ServiceProviderSubmissions.ts
 *   • app/(frontend)/actions/submitJoinCta.ts (server валидация)
 * Така опциите в CMS никога не могат да се разминат с тези във формата.
 */

export const OTHER_VALUE = "__other__";

export type CheckboxGroupDef = {
  key: string;
  label: string;
  hint: string;
  placeholder: string;
  options: string[];
  customOption?: string;
  customPlaceholder?: string;
  max: number;
  min: number;
};

export const PLAN_CHECKBOX_GROUPS: CheckboxGroupDef[] = [
  {
    key: "event",
    label: "Какъв тип събитие планирате?",
    hint: "",
    placeholder: "Изберете събитие",
    options: [
      "Рожден ден / Юбилей",
      "Частно парти",
      "Моминско / Ергенско парти",
      "Сватба / Годеж",
      "Бебешко или семейно събитие",
      "Абитуриентски бал",
      "Корпоративно събитие",
      "Културно или обществено събитие",
    ],
    customOption: "Друго",
    customPlaceholder: "Напиши какво събитие планираш",
    max: 5,
    min: 1,
  },
  {
    key: "service",
    label: "Ако EventAT стартира утре, коя услуга бихте резервирали първо?",
    hint: "",
    placeholder: "Изберете услуга",
    options: [
      "DJ и музиканти",
      "Фотография и видео",
      "Украса и балони",
      "Водещи и артисти",
      "Фотобудки и интерактивни услуги",
      "Кетъринг и напитки",
      "Локации",
    ],
    customOption: "Друго",
    customPlaceholder: "Напиши коя услуга би резервирал",
    max: 5,
    min: 1,
  },
  {
    key: "source",
    label: "Как обикновено намирате изпълнители?",
    hint: "",
    placeholder: "Изберете източник",
    options: [
      "Instagram",
      "Facebook групи",
      "Препоръки от приятели",
      "Google",
      "TikTok",
      "Агенции за събития",
    ],
    customOption: "Друг начин",
    customPlaceholder: "Напиши как намираш изпълнители",
    max: 5,
    min: 1,
  },
  {
    key: "challenge",
    label: "Кое е най-досадното при организацията на събитие?",
    hint: "(изберете до 2)",
    placeholder: "Изберете предизвикателство",
    options: [
      "Намирането на подходящи изпълнители",
      "Сравняването на оферти",
      "Липсата на свободни дати",
      "Комуникацията с различни доставчици",
      "Координацията в деня на събитието",
      "Не знам откъде да започна",
      "Липсата на вдъхновение и идеи",
    ],
    max: 2,
    min: 0,
  },
];

export const OFFER_CHECKBOX_GROUPS: CheckboxGroupDef[] = [
  {
    key: "offerServices",
    label: "Какви услуги предлагате?",
    hint: "",
    placeholder: "Изберете услуга",
    options: [
      "DJ и музиканти",
      "Народни танци и артисти",
      "Фотография и видео",
      "Фотобудки и интерактивни услуги",
      "Украса и балони",
      "Кетъринг и напитки",
      "Локации",
    ],
    customOption: "Друго",
    customPlaceholder: "Напиши каква услуга предлагаш",
    max: 5,
    min: 1,
  },
  {
    key: "offerDiscovery",
    label: "Как клиентите най-често откриват вашите услуги?",
    hint: "",
    placeholder: "Изберете опция",
    options: [
      "Instagram",
      "Facebook",
      "Google",
      "Препоръки",
      "Собствен уебсайт",
    ],
    customOption: "Друго",
    customPlaceholder: "Напиши как те откриват клиентите",
    max: 5,
    min: 1,
  },
  {
    key: "offerCities",
    label: "В кои градове предлагате услугите си?",
    hint: "",
    placeholder: "Изберете град",
    options: [
      "София",
      "Пловдив",
      "Варна",
      "Бургас",
      "Русе",
      "Стара Загора",
      "Велико Търново",
      "Плевен",
      "Цялата страна",
    ],
    customOption: "Друг",
    customPlaceholder: "Напиши в кой град предлагаш услугите си",
    max: 10,
    min: 1,
  },
];
