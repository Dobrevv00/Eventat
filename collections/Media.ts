import type { Access, CollectionConfig } from "payload";

const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Изображения, които клиентът може да сменя от админа.
 * Декоративните UI активи (икони, SVG надписи, градиенти) остават в /public —
 * те са част от дизайна, не от съдържанието.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Файл",
    plural: "Файлове",
  },
  admin: {
    group: "Collections",
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    // Изображенията се показват публично на сайта.
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Алтернативен текст",
      admin: {
        description:
          "Кратко описание на изображението за екранни четци и SEO.",
      },
    },
  ],
};
