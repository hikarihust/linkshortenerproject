import { pgTable, text, varchar, timestamp, bigint } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: bigint('id', { mode: 'number' }).generatedAlwaysAsIdentity().primaryKey(),
  userId: text('user_id').notNull(),
  originalUrl: text('original_url').notNull(),
  shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date', withTimezone: true }).notNull(),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
