import type { Access, GlobalConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Разделено на визуални секции с неименувани табове — те не променят
 * структурата на данните, така че съществуващото съдържание се запазва.
 */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Хедър",
  admin: {
    group: "Настройки",
    description: "Горната лента на сайта — лого, меню и бутон.",
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
          description: "Лого и бутонът вдясно в лентата.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "logoText",
                  type: "text",
                  label: "Лого — основен текст",
                  admin: { width: "50%" },
                },
                {
                  name: "logoSubtext",
                  type: "text",
                  label: "Лого — малък текст отдолу",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Текст на бутона",
                  admin: { width: "50%" },
                },
                {
                  name: "ctaHref",
                  type: "text",
                  label: "Линк на бутона",
                  admin: { width: "50%" },
                },
              ],
            },
            {
              name: "showFavorites",
              type: "checkbox",
              label: "Показвай бутона „Любими“ (♡)",
            },
          ],
        },
        {
          label: "Навигация",
          description:
            "Редът на линковете тук е редът в менюто. Същите линкове се показват и в мобилното меню.",
          fields: [
            {
              name: "navItems",
              type: "array",
              label: "Меню",
              labels: { singular: "Линк", plural: "Линкове" },
              admin: {
                components: {
                  RowLabel: undefined,
                },
              },
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
                      admin: {
                        width: "50%",
                        description: "Например /kontakti или /#uslugi",
                      },
                    },
                  ],
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
