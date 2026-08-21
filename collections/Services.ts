import type { Access, CollectionConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Полетата са подредени по секциите, които клиентът вижда на страницата
 * на услугата. Табовете са неименувани — структурата на данните и
 * съществуващото съдържание остават непроменени.
 */
export const Services: CollectionConfig = {
  slug: "services",
  labels: {
    singular: "Услуга",
    plural: "Услуги",
  },
  admin: {
    group: "Съдържание",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "order", "active"],
    description:
      "Услугите се показват в секция „Услуги“ на главната страница и имат собствена страница.",
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: "order",
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Основна информация",
          description:
            "Показва се в картата на главната страница и в горната част на страницата на услугата.",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                  label: "Име на услугата",
                  admin: { width: "60%" },
                },
                {
                  name: "slug",
                  type: "text",
                  required: true,
                  unique: true,
                  index: true,
                  label: "Адрес на страницата",
                  admin: {
                    width: "40%",
                    description:
                      "Внимание: промяната сменя URL адреса и вреди на позициите в Google.",
                  },
                },
              ],
            },
            {
              name: "shortDescription",
              type: "text",
              required: true,
              label: "Кратко описание",
              admin: {
                description: "Редът под името в картата на главната страница.",
              },
            },
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
              label: "Изображение",
              admin: {
                description:
                  "Използва се и в картата, и в горната част на страницата.",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "order",
                  type: "number",
                  label: "Подредба",
                  defaultValue: 0,
                  admin: {
                    width: "50%",
                    description: "По-малкото число излиза по-напред.",
                  },
                },
                {
                  name: "active",
                  type: "checkbox",
                  label: "Показвай на сайта",
                  defaultValue: true,
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: "Hero",
          description:
            "Уводният текст в горната част. Бутоните тук са общи за всички услуги и се редактират в „Страница „Услуги““.",
          fields: [
            {
              name: "intro",
              type: "textarea",
              required: true,
              label: "Уводен текст",
            },
          ],
        },
        {
          label: "Какво включва",
          description:
            "Точките в белите карти. Заглавието на секцията е общо и се редактира в „Страница „Услуги““.",
          fields: [
            {
              name: "includes",
              type: "array",
              label: "Точки",
              labels: { singular: "Точка", plural: "Точки" },
              fields: [
                { name: "item", type: "text", required: true, label: "Текст" },
              ],
            },
          ],
        },
        {
          label: "Защо през EventAT",
          description:
            "Трите карти с предимства. Заглавието на секцията е общо и се редактира в „Страница „Услуги““.",
          fields: [
            {
              name: "highlights",
              type: "array",
              label: "Предимства",
              labels: { singular: "Предимство", plural: "Предимства" },
              fields: [
                { name: "title", type: "text", required: true, label: "Заглавие" },
                { name: "text", type: "textarea", required: true, label: "Текст" },
              ],
            },
          ],
        },
        {
          label: "Долен CTA",
          description:
            "По подразбиране се използва общият текст от „Страница „Услуги““. Попълни тук само ако тази услуга трябва да е различна.",
          fields: [
            {
              name: "ctaTitle",
              type: "text",
              label: "Заглавие (по избор)",
              admin: {
                description:
                  "Ако е празно, се използва общото заглавие плюс името на услугата.",
              },
            },
            {
              name: "ctaSubtitle",
              type: "textarea",
              label: "Подзаглавие (по избор)",
            },
            {
              type: "row",
              fields: [
                {
                  name: "ctaButtonLabel",
                  type: "text",
                  label: "Текст на бутона (по избор)",
                  admin: { width: "50%" },
                },
                {
                  name: "ctaButtonHref",
                  type: "text",
                  label: "Линк на бутона (по избор)",
                  admin: { width: "50%" },
                },
              ],
            },
          ],
        },
        {
          label: "SEO",
          description:
            "Използва се от Google и при споделяне. Ако са празни, се вземат името и уводният текст.",
          fields: [
            { name: "seoTitle", type: "text", label: "Заглавие за Google" },
            {
              name: "seoDescription",
              type: "textarea",
              label: "Описание за Google",
            },
          ],
        },
      ],
    },
  ],
};
