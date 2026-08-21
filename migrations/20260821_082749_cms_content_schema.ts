import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_why_us_section_features_icon" AS ENUM('payments', 'verified', 'pricing', 'booking', 'quality', 'support');
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"hero_image_id" integer,
  	"order" numeric DEFAULT 0,
  	"active" boolean DEFAULT true,
  	"intro" varchar NOT NULL,
  	"cta_title" varchar,
  	"cta_subtitle" varchar,
  	"cta_button_label" varchar,
  	"cta_button_href" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar,
  	"contact_email" varchar,
  	"contact_address" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"og_image_id" integer,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_text" varchar,
  	"logo_subtext" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"show_favorites" boolean,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cookie_settings_label" varchar,
  	"copyright" varchar,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_process_section_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_why_us_section_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_why_us_section_features_icon" DEFAULT 'payments',
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_join_cta_perks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading_line1" varchar,
  	"hero_heading_highlight" varchar,
  	"hero_heading_suffix" varchar,
  	"hero_subtitle" varchar,
  	"hero_primary_cta_label" varchar,
  	"hero_primary_cta_href" varchar,
  	"hero_secondary_cta_label" varchar,
  	"hero_secondary_cta_href" varchar,
  	"hero_background_image_id" integer,
  	"services_section_eyebrow" varchar,
  	"services_section_title" varchar,
  	"services_section_subtitle" varchar,
  	"process_section_eyebrow" varchar,
  	"process_section_title" varchar,
  	"process_section_subtitle" varchar,
  	"why_us_section_eyebrow" varchar,
  	"why_us_section_title" varchar,
  	"why_us_section_subtitle" varchar,
  	"join_cta_heading_prefix" varchar,
  	"join_cta_heading_highlight" varchar,
  	"join_cta_subtitle" varchar,
  	"join_cta_badge_strong" varchar,
  	"join_cta_badge_rest" varchar,
  	"join_cta_form_eyebrow" varchar,
  	"join_cta_form_title" varchar,
  	"join_cta_tab_plan_label" varchar,
  	"join_cta_tab_offer_label" varchar,
  	"join_cta_submit_label" varchar,
  	"join_cta_form_disclaimer" varchar,
  	"join_cta_name_label" varchar,
  	"join_cta_name_placeholder" varchar,
  	"join_cta_email_label" varchar,
  	"join_cta_email_placeholder" varchar,
  	"join_cta_website_label" varchar,
  	"join_cta_website_placeholder" varchar,
  	"join_cta_opt_in_label" varchar,
  	"join_cta_success_title" varchar,
  	"join_cta_success_text" varchar,
  	"newsletter_title" varchar,
  	"newsletter_subtitle" varchar,
  	"newsletter_placeholder" varchar,
  	"newsletter_button_label" varchar,
  	"newsletter_disclaimer" varchar,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"breadcrumb_label" varchar,
  	"eyebrow" varchar,
  	"primary_cta_label" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_label" varchar,
  	"secondary_cta_href" varchar,
  	"includes_eyebrow" varchar,
  	"includes_title_prefix" varchar,
  	"why_eyebrow" varchar,
  	"why_title" varchar,
  	"bottom_cta_title_prefix" varchar,
  	"bottom_cta_subtitle" varchar,
  	"bottom_cta_button_label" varchar,
  	"bottom_cta_button_href" varchar,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contacts_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"info_card_title" varchar,
  	"address_label" varchar,
  	"email_label" varchar,
  	"response_note" varchar,
  	"name_label" varchar,
  	"name_placeholder" varchar,
  	"email_field_label" varchar,
  	"email_placeholder" varchar,
  	"message_label" varchar,
  	"message_placeholder" varchar,
  	"submit_label" varchar,
  	"success_title" varchar,
  	"success_text" varchar,
  	"seeded" boolean,
  	"seed_version" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "services_includes" ADD CONSTRAINT "services_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_highlights" ADD CONSTRAINT "services_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_links" ADD CONSTRAINT "footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_process_section_steps" ADD CONSTRAINT "home_page_process_section_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_why_us_section_features" ADD CONSTRAINT "home_page_why_us_section_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_join_cta_perks" ADD CONSTRAINT "home_page_join_cta_perks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services_includes_order_idx" ON "services_includes" USING btree ("_order");
  CREATE INDEX "services_includes_parent_id_idx" ON "services_includes" USING btree ("_parent_id");
  CREATE INDEX "services_highlights_order_idx" ON "services_highlights" USING btree ("_order");
  CREATE INDEX "services_highlights_parent_id_idx" ON "services_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_links_order_idx" ON "footer_links" USING btree ("_order");
  CREATE INDEX "footer_links_parent_id_idx" ON "footer_links" USING btree ("_parent_id");
  CREATE INDEX "home_page_process_section_steps_order_idx" ON "home_page_process_section_steps" USING btree ("_order");
  CREATE INDEX "home_page_process_section_steps_parent_id_idx" ON "home_page_process_section_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_why_us_section_features_order_idx" ON "home_page_why_us_section_features" USING btree ("_order");
  CREATE INDEX "home_page_why_us_section_features_parent_id_idx" ON "home_page_why_us_section_features" USING btree ("_parent_id");
  CREATE INDEX "home_page_join_cta_perks_order_idx" ON "home_page_join_cta_perks" USING btree ("_order");
  CREATE INDEX "home_page_join_cta_perks_parent_id_idx" ON "home_page_join_cta_perks" USING btree ("_parent_id");
  CREATE INDEX "home_page_hero_hero_background_image_idx" ON "home_page" USING btree ("hero_background_image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_includes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_process_section_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_why_us_section_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page_join_cta_perks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_page" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "contacts_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_includes" CASCADE;
  DROP TABLE "services_highlights" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "home_page_process_section_steps" CASCADE;
  DROP TABLE "home_page_why_us_section_features" CASCADE;
  DROP TABLE "home_page_join_cta_perks" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "contacts_page" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_services_fk";
  
  DROP INDEX "payload_locked_documents_rels_media_id_idx";
  DROP INDEX "payload_locked_documents_rels_services_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "media_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "services_id";
  DROP TYPE "public"."enum_home_page_why_us_section_features_icon";`)
}
