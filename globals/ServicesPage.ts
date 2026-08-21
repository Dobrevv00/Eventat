import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Повтарящите се текстове на всички страници на услуги (/uslugi/[slug]).
 * Съдържанието на отделната услуга е в колекция „Услуги“.
 */
export const ServicesPage: GlobalConfig = {
  slug: "services-page",
  label: 'Страница „Услуги"',
  admin: {
    group: "Страници",
    description:
      "Текстовете, които се повтарят на всяка страница на услуга. Конкретната услуга се редактира в „Услуги“.",
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
          description: "Горната част на страницата на всяка услуга.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "breadcrumbLabel",
                  type: "text",
                  label: "Текст в пътеката отгоре",
                  admin: { width: "50%" },
                },
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Малък надпис над заглавието",
                  admin: { width: "50%" },
                },
              ],
            },
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
                  label: "Основен бутон — линк",
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
                  label: "Втори бутон — линк",
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: "Какво включва",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "includesEyebrow",
                  type: "text",
                  label: "Малък надпис",
                  admin: { width: "50%" },
                },
                {
                  name: "includesTitlePrefix",
                  type: "text",
                  label: "Начало на заглавието",
                  admin: {
                    width: "50%",
                    description:
                      "След този текст автоматично се добавя името на услугата.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Защо през EventAT",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "whyEyebrow",
                  type: "text",
                  label: "Малък надпис",
                  admin: { width: "50%" },
                },
                {
                  name: "whyTitle",
                  type: "text",
                  label: "Заглавие",
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: "Долен CTA",
          description:
            "Тъмната лента най-долу. Отделна услуга може да я замени със свой текст.",
          fields: [
            {
              name: "bottomCtaTitlePrefix",
              type: "text",
              label: "Начало на заглавието",
              admin: {
                description:
                  "След този текст автоматично се добавя името на услугата.",
              },
            },
            { name: "bottomCtaSubtitle", type: "textarea", label: "Подзаглавие" },
            {
              type: "row",
              fields: [
                {
                  name: "bottomCtaButtonLabel",
                  type: "text",
                  label: "Текст на бутона",
                  admin: { width: "50%" },
                },
                {
                  name: "bottomCtaButtonHref",
                  type: "text",
                  label: "Линк на бутона",
                  admin: { width: "50%" },
                },
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
