import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Футър",
  admin: {
    group: "Настройки",
    description:
      "Долната лента на сайта. Логото се взема от „Хедър“, а контактните данни — от „Настройки на сайта“.",
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
          label: "Навигация",
          description: "Линковете, които се виждат в средата на футъра.",
          fields: [
            {
              name: "links",
              type: "array",
              label: "Линкове",
              labels: { singular: "Линк", plural: "Линкове" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                      label: "Текст",
                      admin: { width: "50%" },
                    },
                    {
                      name: "href",
                      type: "text",
                      required: true,
                      label: "Линк",
                      admin: { width: "50%" },
                    },
                  ],
                },
              ],
            },
            {
              name: "cookieSettingsLabel",
              type: "text",
              label: "Текст на бутона за бисквитки",
              admin: {
                description:
                  "Отваря панела с настройки за бисквитки. Само надписът се променя.",
              },
            },
          ],
        },
        {
          label: "Долен ред",
          fields: [
            {
              name: "copyright",
              type: "text",
              label: "Текст за авторски права",
            },
          ],
        },
      ],
    },
    { name: "seeded", type: "checkbox", admin: { hidden: true } },
    { name: "seedVersion", type: "number", admin: { hidden: true } },
  ],
};
