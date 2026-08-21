import type { CollectionConfig } from "payload";

import { OFFER_CHECKBOX_GROUPS } from "../lib/joinCtaQuestions";
import { authenticated, questionFields, systemFields } from "./joinCtaFields";

/**
 * Записите от таб „Предлагам услуга“ на формата в Join CTA секцията.
 * Полетата отразяват 1:1 това, което изпълнителят реално попълва.
 */
export const ServiceProviderSubmissions: CollectionConfig = {
  slug: "service-provider-submissions",
  labels: {
    singular: "Заявка „Предлагам услуга“",
    plural: "Предлагам услуга",
  },
  admin: {
    group: "Запитвания",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "status", "createdAt"],
    description:
      "Записванията от таб „Предлагам услуга“ в секцията за записване в листата.",
  },
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Име",
          admin: { width: "50%" },
        },
        {
          name: "email",
          type: "email",
          required: true,
          label: "Имейл",
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "website",
      type: "text",
      label: "Уебсайт",
      admin: { description: "Полето не е задължително във формата." },
    },
    ...OFFER_CHECKBOX_GROUPS.flatMap(questionFields),
    ...systemFields([
      { value: "new", label: "Ново" },
      { value: "in_progress", label: "В процес" },
      { value: "contacted", label: "Осъществен контакт" },
      { value: "approved", label: "Одобрен" },
      { value: "rejected", label: "Отказан" },
      { value: "spam", label: "Спам" },
    ]),
  ],
  timestamps: true,
};
