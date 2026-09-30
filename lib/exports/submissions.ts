import type { Field, Option, SanitizedCollectionConfig } from "payload";
import writeXlsxFile from "write-excel-file/node";
import type { Cell, Column } from "write-excel-file/node";

/**
 * Експорт на попълванията от формите в Excel (.xlsx).
 *
 * Колоните се извличат от самата дефиниция на колекцията, а не са изброени
 * тук — така нов въпрос във формата се появява в таблицата автоматично.
 */

export const EXPORTABLE_COLLECTIONS = [
  "contact-submissions",
  "event-planning-submissions",
  "service-provider-submissions",
] as const;

export type ExportableCollection = (typeof EXPORTABLE_COLLECTIONS)[number];

export function isExportableCollection(
  slug: string,
): slug is ExportableCollection {
  return (EXPORTABLE_COLLECTIONS as readonly string[]).includes(slug);
}

/** Таван на редовете в един файл — предпазва сървъра при много записи. */
export const MAX_EXPORT_ROWS = 5000;

/** Латиница за името на файла, за да е четимо на всяка система. */
const FILE_NAMES: Record<ExportableCollection, string> = {
  "contact-submissions": "kontaktni-zapitvaniya",
  "event-planning-submissions": "planiram-sabitie",
  "service-provider-submissions": "predlagam-usluga",
};

type Doc = Record<string, unknown>;

const DATE_FORMAT = "dd.mm.yyyy hh:mm";
const HEADER_STYLE = {
  fontWeight: "bold" as const,
  backgroundColor: "#f4eff5",
  align: "left" as const,
};

const WIDTH = { id: 8, text: 24, longText: 48, list: 38, date: 18 };

/** Presentational контейнерите (row, collapsible, таб без име) не носят данни. */
function flattenFields(fields: Field[]): Field[] {
  const out: Field[] = [];

  for (const field of fields) {
    if (field.type === "row" || field.type === "collapsible") {
      out.push(...flattenFields(field.fields));
    } else if (field.type === "tabs") {
      for (const tab of field.tabs) {
        if (!("name" in tab)) out.push(...flattenFields(tab.fields));
      }
    } else {
      out.push(field);
    }
  }

  return out;
}

function staticLabel(label: unknown, fallback: string): string {
  if (typeof label === "string" && label) return label;
  if (label && typeof label === "object") {
    const byLocale = label as Record<string, string>;
    return byLocale.bg ?? Object.values(byLocale)[0] ?? fallback;
  }
  return fallback;
}

function optionLabels(options: Option[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const option of options) {
    if (typeof option === "string") map.set(option, option);
    else map.set(String(option.value), staticLabel(option.label, String(option.value)));
  }
  return map;
}

const asText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.map(asText).filter(Boolean).join(", ");
  if (typeof value === "boolean") return value ? "Да" : "Не";
  return String(value);
};

const dateCell = (value: unknown): Cell => {
  if (typeof value !== "string" && !(value instanceof Date)) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : { value: date, type: Date, format: DATE_FORMAT };
};

/**
 * Payload сам добавя тези полета към конфигурацията. Те излизат накрая на
 * таблицата с български заглавия, затова тук се пропускат.
 */
const SKIP_FIELDS = new Set(["createdAt", "updatedAt", "deletedAt", "_status"]);

/** Колона за едно поле от колекцията; null за полета без данни (ui). */
function columnForField(field: Field): Column<Doc> | null {
  if (field.type === "ui" || !("name" in field) || !field.name) return null;
  if (SKIP_FIELDS.has(field.name)) return null;

  const name = field.name;
  const header = { value: staticLabel(field.label, name), ...HEADER_STYLE };

  if (field.type === "checkbox") {
    return {
      header,
      width: WIDTH.text,
      cell: (doc) => (doc[name] === true ? "Да" : "Не"),
    };
  }

  if (field.type === "select") {
    const labels = optionLabels(field.options);
    return {
      header,
      width: WIDTH.text,
      cell: (doc) => {
        const raw = doc[name];
        if (Array.isArray(raw)) {
          return raw.map((v) => labels.get(String(v)) ?? asText(v)).join(", ");
        }
        return raw === null || raw === undefined
          ? ""
          : (labels.get(String(raw)) ?? asText(raw));
      },
    };
  }

  if (field.type === "number") {
    return {
      header,
      width: WIDTH.text,
      cell: (doc) =>
        typeof doc[name] === "number"
          ? { value: doc[name] as number, type: Number }
          : null,
    };
  }

  if (field.type === "date") {
    return { header, width: WIDTH.date, cell: (doc) => dateCell(doc[name]) };
  }

  const hasMany = "hasMany" in field && field.hasMany === true;
  const isLongText = field.type === "textarea";

  return {
    header,
    width: hasMany ? WIDTH.list : isLongText ? WIDTH.longText : WIDTH.text,
    cell: (doc) => ({
      value: asText(doc[name]),
      ...(hasMany || isLongText ? { wrap: true } : {}),
    }),
  };
}

/** Excel не приема име на лист над 31 знака и някои специални символи. */
function sheetName(label: string): string {
  const clean = label.replace(/[\\/?*[\]:]/g, " ").trim();
  return clean.slice(0, 31) || "Данни";
}

export function exportFileName(
  collection: ExportableCollection,
  date = new Date(),
): string {
  const day = date.toISOString().slice(0, 10);
  return `${FILE_NAMES[collection]}-${day}.xlsx`;
}

export async function buildSubmissionsWorkbook({
  collectionConfig,
  docs,
}: {
  collectionConfig: SanitizedCollectionConfig;
  docs: Doc[];
}): Promise<Buffer> {
  const columns: Column<Doc>[] = [
    {
      header: { value: "№", ...HEADER_STYLE },
      width: WIDTH.id,
      cell: (doc) =>
        typeof doc.id === "number"
          ? { value: doc.id, type: Number }
          : asText(doc.id),
    },
    ...flattenFields(collectionConfig.fields)
      .map(columnForField)
      .filter((column): column is Column<Doc> => column !== null),
    {
      header: { value: "Получено на", ...HEADER_STYLE },
      width: WIDTH.date,
      cell: (doc) => dateCell(doc.createdAt),
    },
    {
      header: { value: "Последна промяна", ...HEADER_STYLE },
      width: WIDTH.date,
      cell: (doc) => dateCell(doc.updatedAt),
    },
  ];

  return writeXlsxFile(docs, {
    columns,
    sheet: sheetName(
      staticLabel(collectionConfig.labels?.plural, collectionConfig.slug),
    ),
    // Заглавният ред остава видим при скролване.
    stickyRowsCount: 1,
  }).toBuffer();
}
