import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Само стойности, използвани на повече от едно място.
 * Текстовете на отделните секции живеят в „Страници“.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Настройки на сайта",
  admin: {
    group: "Настройки",
    description:
      "Общи данни за целия сайт. Текстовете по секциите се редактират от „Страници“.",
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
          label: "Основни",
          fields: [
            { name: "siteName", type: "text", label: "Име на сайта" },
          ],
        },
        {
          label: "Контакти",
          description:
            "Показват се на страница „Контакти“. Промяната тук се отразява навсякъде, където се използват.",
          fields: [
            { name: "contactEmail", type: "email", label: "Имейл" },
            { name: "contactAddress", type: "text", label: "Адрес" },
          ],
        },
        {
          label: "SEO и споделяне",
          description:
            "Използва се, когато страница няма собствено заглавие или описание.",
          fields: [
            { name: "metaTitle", type: "text", label: "Заглавие по подразбиране" },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Описание по подразбиране",
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "Изображение при споделяне",
              admin: { description: "Препоръчителен размер 1200×630 пиксела." },
            },
          ],
        },
      ],
    },
    { name: "seeded", type: "checkbox", admin: { hidden: true } },
    { name: "seedVersion", type: "number", admin: { hidden: true } },
  ],
};
