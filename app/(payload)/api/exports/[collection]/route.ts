import config from "@payload-config";
import { getPayload } from "payload";
import type { Where } from "payload";
import { mergeListSearchAndWhere } from "payload/shared";

import {
  buildSubmissionsWorkbook,
  exportFileName,
  isExportableCollection,
  MAX_EXPORT_ROWS,
} from "@/lib/exports/submissions";

/**
 * Сваляне на попълванията от формите като Excel файл.
 *
 * Достъпът е само за влязъл в админ панела потребител и минава през access
 * control-а на колекцията (overrideAccess: false). Филтърът и подредбата идват
 * от списъка в админа, за да се свали точно това, което е на екрана.
 */

function parseWhere(raw: string | null): Where | undefined {
  if (!raw) return undefined;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Where)
      : undefined;
  } catch {
    return undefined;
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ collection: string }> },
) {
  const { collection } = await params;

  if (!isExportableCollection(collection)) {
    return Response.json({ error: "Няма такъв експорт." }, { status: 404 });
  }

  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });

  if (!user) {
    return Response.json(
      { error: "Нужен е вход в админ панела." },
      { status: 401 },
    );
  }

  const url = new URL(req.url);
  const search = url.searchParams.get("search")?.trim() ?? "";
  const sort = url.searchParams.get("sort") || "-createdAt";
  const collectionConfig = payload.collections[collection].config;

  const where = search
    ? mergeListSearchAndWhere({
        collectionConfig,
        search,
        where: parseWhere(url.searchParams.get("where")),
      })
    : parseWhere(url.searchParams.get("where"));

  try {
    const result = await payload.find({
      collection,
      ...(where ? { where } : {}),
      sort,
      depth: 0,
      limit: MAX_EXPORT_ROWS,
      overrideAccess: false,
      user,
    });

    const file = await buildSubmissionsWorkbook({
      collectionConfig,
      docs: result.docs as unknown as Record<string, unknown>[],
    });

    const fileName = exportFileName(collection);

    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        "Content-Length": String(file.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch {
    // Без лични данни в лога — само че експортът се е провалил.
    payload.logger.error(`[export] failed for ${collection}`);
    return Response.json(
      { error: "Експортът не можа да бъде подготвен." },
      { status: 500 },
    );
  }
}
