import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

export const ContactsPage: GlobalConfig = {
  slug: "contacts-page",
  label: 'Страница „Контакти"',
  admin: {
    group: "Страници",
    description:
      "Текстовете на страница /kontakti. Адресът и имейлът се вземат от „Настройки на сайта“.",
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
          label: "Hero / Въведение",
          description: "Заглавната част в горния край на страницата.",
          fields: [
            { name: "eyebrow", type: "text", label: "Малък надпис отгоре" },
            { name: "title", type: "text", label: "Основно заглавие" },
            { name: "subtitle", type: "textarea", label: "Подзаглавие" },
          ],
        },
        {
          label: "Контактна информация",
          description:
            "Бялата карта вляво. Самите адрес и имейл се редактират в „Настройки на сайта“.",
          fields: [
            { name: "infoCardTitle", type: "text", label: "Заглавие на картата" },
            {
              type: "row",
              fields: [
                {
                  name: "addressLabel",
                  type: "text",
                  label: "Надпис над адреса",
                  admin: { width: "50%" },
                },
                {
                  name: "emailLabel",
                  type: "text",
                  label: "Надпис над имейла",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "responseNote",
              type: "text",
              label: "Бележка в долния край на картата",
            },
          ],
        },
        {
          label: "Контактна форма",
          description:
            "Само надписите. Начинът на изпращане и проверките остават непроменени.",
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
                  name: "emailFieldLabel",
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
                  name: "messageLabel",
                  type: "text",
                  label: "Съобщение — надпис",
                  admin: { width: "50%" },
                },
                {
                  name: "messagePlaceholder",
                  type: "text",
                  label: "Съобщение — примерен текст",
                  admin: { width: "50%" },
                },
              ],
            },
            { name: "submitLabel", type: "text", label: "Текст на бутона" },
            {
              type: "collapsible",
              label: "Съобщение след успешно изпращане",
              fields: [
                { name: "successTitle", type: "text", label: "Заглавие" },
                { name: "successText", type: "textarea", label: "Текст" },
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
