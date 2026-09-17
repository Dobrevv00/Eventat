import { notFound } from "next/navigation";

/**
 * Несъществуващи адреси нямат собствен root layout (сайтът и админ панелът са
 * в отделни route групи), затова ги насочваме към not-found на сайта — така
 * 404 страницата е на български и с хедър и футър. /admin и /api остават с
 * приоритет, защото са статични сегменти.
 */
export default function CatchAllNotFound() {
  notFound();
}
