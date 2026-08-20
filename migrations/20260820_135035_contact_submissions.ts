import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Само schema change-ът за новата collection `contact-submissions`.
 *
 * Генераторът беше произвел пълна схема "от нулата" (users, users_sessions,
 * payload_kv, payload_locked_documents, payload_preferences, payload_migrations),
 * защото production базата няма записи в payload_migrations. Тези таблици вече
 * съществуват, затова целият им SQL е премахнат — включително DROP-овете им в
 * down(), които биха изтрили потребителите.
 *
 * payload_locked_documents_rels също вече съществува, но без колоната
 * contact_submissions_id, затова тук тя се добавя с ALTER TABLE.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'in_progress', 'answered', 'spam');

  CREATE TABLE "contact_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"status" "enum_contact_submissions_status" DEFAULT 'new' NOT NULL,
  	"internal_note" varchar,
  	"page_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "contact_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_submissions_fk" FOREIGN KEY ("contact_submissions_id") REFERENCES "public"."contact_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions" USING btree ("status");
  CREATE INDEX "contact_submissions_updated_at_idx" ON "contact_submissions" USING btree ("updated_at");
  CREATE INDEX "contact_submissions_created_at_idx" ON "contact_submissions" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_contact_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("contact_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_contact_submissions_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_contact_submissions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "contact_submissions_id";
  DROP INDEX IF EXISTS "contact_submissions_status_idx";
  DROP INDEX IF EXISTS "contact_submissions_updated_at_idx";
  DROP INDEX IF EXISTS "contact_submissions_created_at_idx";
  DROP TABLE IF EXISTS "contact_submissions" CASCADE;
  DROP TYPE IF EXISTS "public"."enum_contact_submissions_status";`)
}
