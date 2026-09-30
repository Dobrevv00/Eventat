"use client";

import { useMemo } from "react";
import { Button, useConfig, useListQuery } from "@payloadcms/ui";

/**
 * Бутон „Изтегли в Excel“ над списъка със запитвания.
 *
 * Подава текущия филтър, търсене и подредба на /api/exports/<колекция>,
 * за да се свали точно това, което е на екрана.
 */
export function ExportSubmissions() {
  const { collectionSlug, data, query } = useListQuery();
  const {
    config: {
      routes: { api },
    },
  } = useConfig();

  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (query?.where && Object.keys(query.where).length > 0) {
      params.set("where", JSON.stringify(query.where));
    }
    if (typeof query?.search === "string" && query.search.trim()) {
      params.set("search", query.search.trim());
    }
    if (query?.sort) params.set("sort", String(query.sort));

    const queryString = params.toString();
    return `${api}/exports/${collectionSlug}${queryString ? `?${queryString}` : ""}`;
  }, [api, collectionSlug, query?.search, query?.sort, query?.where]);

  const total = data?.totalDocs;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "var(--base)",
      }}
    >
      <Button
        buttonStyle="secondary"
        size="small"
        onClick={() => window.location.assign(href)}
        tooltip="Сваля показаните в момента записи като .xlsx файл"
      >
        {typeof total === "number"
          ? `⤓ Изтегли в Excel (${total})`
          : "⤓ Изтегли в Excel"}
      </Button>
    </div>
  );
}

export default ExportSubmissions;
