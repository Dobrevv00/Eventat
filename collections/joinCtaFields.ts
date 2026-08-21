import type { Access, Field } from "payload";

import type { CheckboxGroupDef } from "../lib/joinCtaQuestions";

/** Достъп само за влязъл в Payload администратор. */
export const authenticated: Access = ({ req }) => Boolean(req.user);

/**
 * Строи полетата за един въпрос от формата:
 *   • text с hasMany — избраните опции, записани дословно
 *   • text — свободният текст, ако е избрано „Друго“
 *
 * Защо text, а не select: PostgreSQL ограничава етикетите на enum до 63 байта,
 * а опциите тук са на кирилица (2 байта на символ) и някои я надхвърлят —
 * напр. „Намирането на подходящи изпълнители“ е 70 байта. Записът на точния
 * текст е и по-устойчив: промяна в списъка с опции не изисква миграция и не
 * обезсмисля старите записи.
 *
 * Списъкът с валидни опции идва от lib/joinCtaQuestions.ts и се проверява в
 * server action-а, така че в базата попадат само реално съществуващи стойности.
 */
export function questionFields(def: CheckboxGroupDef): Field[] {
  const optionList = [
    ...def.options,
    ...(def.customOption ? [`${def.customOption} (свободен текст)`] : []),
  ].join(" · ");

  const fields: Field[] = [
    {
      name: def.key,
      type: "text",
      hasMany: true,
      label: def.label,
      admin: {
        description:
          (def.min > 0
            ? `Избор от ${def.min} до ${def.max}. `
            : `Избор до ${def.max}. `) + `Възможни отговори: ${optionList}`,
      },
    },
  ];

  if (def.customOption) {
    fields.push({
      name: `${def.key}Other`,
      type: "text",
      label: `${def.customOption} — свободен текст`,
      admin: {
        description: `Попълва се, когато е избрано „${def.customOption}“.`,
      },
    });
  }

  return fields;
}

/** Общите системни полета за двете колекции със запитвания. */
export function systemFields(
  statusOptions: { value: string; label: string }[],
): Field[] {
  return [
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      index: true,
      label: "Статус",
      options: statusOptions,
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
      admin: { readOnly: true, description: "Страницата, от която е изпратена формата." },
    },
  ];
}
