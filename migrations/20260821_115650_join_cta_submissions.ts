import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_event_planning_submissions_status" AS ENUM('new', 'in_progress', 'contacted', 'completed', 'spam');
  CREATE TYPE "public"."enum_service_provider_submissions_status" AS ENUM('new', 'in_progress', 'contacted', 'approved', 'rejected', 'spam');
  CREATE TABLE "event_planning_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"event_other" varchar,
  	"service_other" varchar,
  	"source_other" varchar,
  	"early_access_opt_in" boolean,
  	"status" "enum_event_planning_submissions_status" DEFAULT 'new' NOT NULL,
  	"internal_note" varchar,
  	"page_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "event_planning_submissions_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "service_provider_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"website" varchar,
  	"offer_services_other" varchar,
  	"offer_discovery_other" varchar,
  	"offer_cities_other" varchar,
  	"status" "enum_service_provider_submissions_status" DEFAULT 'new' NOT NULL,
  	"internal_note" varchar,
  	"page_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_provider_submissions_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "event_planning_submissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_provider_submissions_id" integer;
  ALTER TABLE "event_planning_submissions_texts" ADD CONSTRAINT "event_planning_submissions_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."event_planning_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_provider_submissions_texts" ADD CONSTRAINT "service_provider_submissions_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_provider_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "event_planning_submissions_status_idx" ON "event_planning_submissions" USING btree ("status");
  CREATE INDEX "event_planning_submissions_updated_at_idx" ON "event_planning_submissions" USING btree ("updated_at");
  CREATE INDEX "event_planning_submissions_created_at_idx" ON "event_planning_submissions" USING btree ("created_at");
  CREATE INDEX "event_planning_submissions_texts_order_parent" ON "event_planning_submissions_texts" USING btree ("order","parent_id");
  CREATE INDEX "service_provider_submissions_status_idx" ON "service_provider_submissions" USING btree ("status");
  CREATE INDEX "service_provider_submissions_updated_at_idx" ON "service_provider_submissions" USING btree ("updated_at");
  CREATE INDEX "service_provider_submissions_created_at_idx" ON "service_provider_submissions" USING btree ("created_at");
  CREATE INDEX "service_provider_submissions_texts_order_parent" ON "service_provider_submissions_texts" USING btree ("order","parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_event_planning_submissions_fk" FOREIGN KEY ("event_planning_submissions_id") REFERENCES "public"."event_planning_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_provider_submission_fk" FOREIGN KEY ("service_provider_submissions_id") REFERENCES "public"."service_provider_submissions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_event_planning_submissions_idx" ON "payload_locked_documents_rels" USING btree ("event_planning_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_service_provider_submissio_idx" ON "payload_locked_documents_rels" USING btree ("service_provider_submissions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "event_planning_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "event_planning_submissions_texts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_provider_submissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_provider_submissions_texts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "event_planning_submissions" CASCADE;
  DROP TABLE "event_planning_submissions_texts" CASCADE;
  DROP TABLE "service_provider_submissions" CASCADE;
  DROP TABLE "service_provider_submissions_texts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_event_planning_submissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_provider_submission_fk";
  
  DROP INDEX "payload_locked_documents_rels_event_planning_submissions_idx";
  DROP INDEX "payload_locked_documents_rels_service_provider_submissio_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "event_planning_submissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_provider_submissions_id";
  DROP TYPE "public"."enum_event_planning_submissions_status";
  DROP TYPE "public"."enum_service_provider_submissions_status";`)
}
