import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { ContactSubmissions } from "./collections/ContactSubmissions";
import { EventPlanningSubmissions } from "./collections/EventPlanningSubmissions";
import { ServiceProviderSubmissions } from "./collections/ServiceProviderSubmissions";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { ContactsPage } from "./globals/ContactsPage";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { HomePage } from "./globals/HomePage";
import { ServicesPage } from "./globals/ServicesPage";
import { SiteSettings } from "./globals/SiteSettings";
import { runSeed } from "./lib/seed/run";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Services,
    ContactSubmissions,
    EventPlanningSubmissions,
    ServiceProviderSubmissions,
  ],
  globals: [SiteSettings, Header, Footer, HomePage, ServicesPage, ContactsPage],
  editor: lexicalEditor(),
  // Първоначално попълване с текущото съдържание. Идемпотентно — не създава
  // дубликати и не презаписва редактирано от клиента съдържание.
  onInit: async (payload) => {
    try {
      await runSeed(payload);
    } catch {
      payload.logger.warn("[seed] skipped: initial content seeding failed");
    }
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  sharp,
});
