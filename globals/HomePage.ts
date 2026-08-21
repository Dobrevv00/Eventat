import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

const headingFields = [
  { name: "eyebrow", type: "text" as const, label: "Надслов" },
  { name: "title", type: "text" as const, label: "Заглавие" },
  { name: "subtitle", type: "textarea" as const, label: "Подзаглавие" },
];

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Главна страница",
  admin: {
    group: "Страници",
    description:
      "Съдържанието на секциите на началната страница. Списъкът с услуги се управлява от „Услуги“.",
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          description: "Първият екран, който посетителят вижда.",
          fields: [
            {
              name: "hero",
              type: "group",
              label: " ",
              fields: [
                {
                  name: "headingLine1",
                  type: "text",
                  label: "Заглавие — първи ред",
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "headingHighlight",
                      type: "text",
                      label: "Заглавие — цветна част",
                      admin: { width: "50%" },
                    },
                    {
                      name: "headingSuffix",
                      type: "text",
                      label: "Заглавие — край",
                      admin: { width: "50%" },
                    },
                  ],
                },
                { name: "subtitle", type: "textarea", label: "Подзаглавие" },
                {
                  type: "row",
                  fields: [
                    {
                      name: "primaryCtaLabel",
                      type: "text",
                      label: "Основен бутон — текст",
                      admin: { width: "50%" },
                    },
                    {
                      name: "primaryCtaHref",
                      type: "text",
                      label: "Основен бутон — адрес",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "secondaryCtaLabel",
                      type: "text",
                      label: "Втори бутон — текст",
                      admin: { width: "50%" },
                    },
                    {
                      name: "secondaryCtaHref",
                      type: "text",
                      label: "Втори бутон — адрес",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "backgroundImage",
                  type: "upload",
                  relationTo: "media",
                  label: "Фоново изображение",
                  admin: {
                    description:
                      "Ако е празно, се използва текущият фон от дизайна.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Услуги",
          description:
            "Само заглавната част на секцията. Самите карти идват от „Услуги“ в раздел „Съдържание“.",
          fields: [
            {
              name: "servicesSection",
              type: "group",
              label: " ",
              fields: headingFields,
            },
          ],
        },
        {
          label: "Лесен процес",
          fields: [
            {
              name: "processSection",
              type: "group",
              label: " ",
              fields: [
                ...headingFields,
                {
                  name: "steps",
                  type: "array",
                  label: "Стъпки",
                  labels: { singular: "Стъпка", plural: "Стъпки" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "number",
                          type: "text",
                          required: true,
                          label: "Номер",
                          admin: { width: "25%" },
                        },
                        {
                          name: "title",
                          type: "text",
                          required: true,
                          label: "Заглавие",
                          admin: { width: "75%" },
                        },
                      ],
                    },
                    {
                      name: "text",
                      type: "textarea",
                      required: true,
                      label: "Текст",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Защо EventAT",
          fields: [
            {
              name: "whyUsSection",
              type: "group",
              label: " ",
              fields: [
                ...headingFields,
                {
                  name: "features",
                  type: "array",
                  label: "Предимства",
                  labels: { singular: "Предимство", plural: "Предимства" },
                  fields: [
                    {
                      name: "icon",
                      type: "select",
                      label: "Икона",
                      defaultValue: "payments",
                      options: [
                        { value: "payments", label: "Сигурни плащания (щит)" },
                        { value: "verified", label: "Проверени (отметка)" },
                        { value: "pricing", label: "Цени (диамант)" },
                        { value: "booking", label: "Резервация (календар)" },
                        { value: "quality", label: "Качество (звезда)" },
                        { value: "support", label: "Подкрепа (сърце)" },
                      ],
                    },
                    {
                      name: "title",
                      type: "text",
                      required: true,
                      label: "Заглавие",
                    },
                    {
                      name: "text",
                      type: "textarea",
                      required: true,
                      label: "Текст",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Join CTA",
          description:
            "Тъмната секция с формата за записване. Тук се променят само текстовете.",
          fields: [
            {
              name: "joinCta",
              type: "group",
              label: " ",
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "headingPrefix",
                      type: "text",
                      label: "Заглавие — начало",
                      admin: { width: "50%" },
                    },
                    {
                      name: "headingHighlight",
                      type: "text",
                      label: "Заглавие — цветна част",
                      admin: { width: "50%" },
                    },
                  ],
                },
                { name: "subtitle", type: "textarea", label: "Подзаглавие" },
                {
                  type: "row",
                  fields: [
                    {
                      name: "badgeStrong",
                      type: "text",
                      label: "Бадж — удебелена част",
                      admin: { width: "50%" },
                    },
                    {
                      name: "badgeRest",
                      type: "text",
                      label: "Бадж — останалата част",
                      admin: { width: "50%" },
                    },
                  ],
                },
                {
                  name: "perks",
                  type: "array",
                  label: "Предимства (списък с ✦)",
                  labels: { singular: "Ред", plural: "Редове" },
                  fields: [
                    { name: "text", type: "text", required: true, label: "Текст" },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Форма — заглавие и бутон",
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: "formEyebrow",
                      type: "text",
                      label: "Малък надпис над заглавието",
                    },
                    { name: "formTitle", type: "text", label: "Заглавие" },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "tabPlanLabel",
                          type: "text",
                          label: "Първи таб",
                          admin: { width: "50%" },
                        },
                        {
                          name: "tabOfferLabel",
                          type: "text",
                          label: "Втори таб",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    { name: "submitLabel", type: "text", label: "Текст на бутона" },
                    {
                      name: "formDisclaimer",
                      type: "text",
                      label: "Текст под бутона",
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Форма — надписи на полетата",
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        {
                          name: "nameLabel",
                          type: "text",
                          label: "Име — надпис",
                          admin: { width: "50%" },
                        },
                        {
                          name: "namePlaceholder",
                          type: "text",
                          label: "Име — примерен текст",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "emailLabel",
                          type: "text",
                          label: "Имейл — надпис",
                          admin: { width: "50%" },
                        },
                        {
                          name: "emailPlaceholder",
                          type: "text",
                          label: "Имейл — примерен текст",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      type: "row",
                      fields: [
                        {
                          name: "websiteLabel",
                          type: "text",
                          label: "Уебсайт — надпис",
                          admin: { width: "50%" },
                        },
                        {
                          name: "websitePlaceholder",
                          type: "text",
                          label: "Уебсайт — примерен текст",
                          admin: { width: "50%" },
                        },
                      ],
                    },
                    {
                      name: "optInLabel",
                      type: "textarea",
                      label: "Текст до отметката за ранен достъп",
                    },
                  ],
                },
                {
                  type: "collapsible",
                  label: "Съобщение след успешно записване",
                  admin: { initCollapsed: true },
                  fields: [
                    { name: "successTitle", type: "text", label: "Заглавие" },
                    { name: "successText", type: "textarea", label: "Текст" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Бюлетин",
          fields: [
            {
              name: "newsletter",
              type: "group",
              label: " ",
              fields: [
                { name: "title", type: "text", label: "Заглавие" },
                { name: "subtitle", type: "text", label: "Подзаглавие" },
                { name: "placeholder", type: "text", label: "Плейсхолдър" },
                { name: "buttonLabel", type: "text", label: "Бутон" },
                { name: "disclaimer", type: "text", label: "Текст отдолу" },
              ],
            },
          ],
        },
      ],
    },
    { name: "seeded", type: "checkbox", admin: { hidden: true } },
    { name: "seedVersion", type: "number", admin: { hidden: true } },
  ],
};
