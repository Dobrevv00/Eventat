import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_provider_submissions" ADD COLUMN "social_profile" varchar;
  ALTER TABLE "home_page" ADD COLUMN "join_cta_social_label" varchar;
  ALTER TABLE "home_page" ADD COLUMN "join_cta_social_placeholder" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_provider_submissions" DROP COLUMN "social_profile";
  ALTER TABLE "home_page" DROP COLUMN "join_cta_social_label";
  ALTER TABLE "home_page" DROP COLUMN "join_cta_social_placeholder";`)
}
