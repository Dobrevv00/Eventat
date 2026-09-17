import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  RequestContext,
} from "payload";

/**
 * Страниците на сайта се генерират статично при build. Без това след промяна
 * в CMS продукционният сайт показва старото съдържание до следващия deploy.
 *
 * Прегенерираме целия сайт, защото Header/Footer/настройките са общи за
 * всички страници, а промените в CMS са редки.
 */
function revalidateSite(context: RequestContext | undefined): void {
  // Seed-ът при старт пише в базата извън Next.js заявка.
  if (context?.disableRevalidate) return;

  try {
    revalidatePath("/", "layout");
  } catch {
    // Извън Next.js заявка (скриптове, CLI) няма кеш за прегенериране.
  }
}

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidateSite(req.context);
  return doc;
};

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidateSite(req.context);
  return doc;
};

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  revalidateSite(req.context);
  return doc;
};
