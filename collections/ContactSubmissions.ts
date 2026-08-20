import type { Access, CollectionConfig } from "payload";

/**
 * Достъп само за влезли в Payload потребители.
 * Публичната контактна форма НЕ минава през REST API — тя записва през
 * trusted Server Action с Local API и overrideAccess.
 */
const authenticated: Access = ({ req }) => Boolean(req.user);

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: {
    singular: "Контактно запитване",
    plural: "Контактни запитвания",
  },
  admin: {
    group: "Запитвания",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "status", "createdAt"],
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Име",
    },
    {
      name: "email",
      type: "email",
      required: true,
      label: "Имейл",
    },
    {
      name: "message",
      type: "textarea",
      required: true,
      label: "Съобщение",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      label: "Статус",
      options: [
        { value: "new", label: "Ново" },
        { value: "in_progress", label: "В процес" },
        { value: "answered", label: "Отговорено" },
        { value: "spam", label: "Спам" },
      ],
    },
    {
      name: "internalNote",
      type: "textarea",
      label: "Вътрешна бележка",
      admin: {
        description:
          "Само за вътрешна употреба. Не се показва на подателя и не напуска админ панела.",
      },
    },
    {
      name: "pagePath",
      type: "text",
      label: "Източник",
      admin: {
        readOnly: true,
      },
    },
  ],
  // createdAt / updatedAt се управляват от Payload.
  timestamps: true,
};
