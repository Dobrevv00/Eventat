import type { CollectionConfig } from "payload";

import { PLAN_CHECKBOX_GROUPS } from "../lib/joinCtaQuestions";
import { authenticated, questionFields, systemFields } from "./joinCtaFields";

/**
 * Записите от таб „Планирам събитие“ на формата в Join CTA секцията.
 * Полетата отразяват 1:1 това, което потребителят реално попълва.
 */
export const EventPlanningSubmissions: CollectionConfig = {
  slug: "event-planning-submissions",
  labels: {
    singular: "Заявка „Планирам събитие“",
    plural: "Планирам събитие",
  },
  admin: {
    group: "Запитвания",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "status", "createdAt"],
    description:
      "Записванията от таб „Планирам събитие“ в секцията за записване в листата.",
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
    ...PLAN_CHECKBOX_GROUPS.flatMap(questionFields),
    {
      name: "earlyAccessOptIn",
      type: "checkbox",
      label: "Желае ранен достъп и специални предложения",
      admin: {
        description:
          "Отметката за маркетингово съгласие във формата. Правно основание за бъдещи съобщения.",
      },
    },
    ...systemFields([
      { value: "new", label: "Ново" },
      { value: "in_progress", label: "В процес" },
      { value: "contacted", label: "Осъществен контакт" },
      { value: "completed", label: "Приключено" },
      { value: "spam", label: "Спам" },
    ]),
  ],
  timestamps: true,
};
