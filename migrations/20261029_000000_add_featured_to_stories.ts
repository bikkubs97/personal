import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-sqlite";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const { rows } = await db.run(sql`PRAGMA table_info(stories)`);
  if (!rows.some((column) => column.name === "featured")) {
    await db.run(sql`ALTER TABLE stories ADD COLUMN featured INTEGER DEFAULT 0`);
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  const { rows } = await db.run(sql`PRAGMA table_info(stories)`);
  if (rows.some((column) => column.name === "featured")) {
    await db.run(sql`ALTER TABLE stories DROP COLUMN featured`);
  }
}
