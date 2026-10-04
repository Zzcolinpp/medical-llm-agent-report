import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const cardEdits = sqliteTable('card_edits', {
  cardId: text('card_id').primaryKey(),
  payload: text('payload').notNull(),
  revision: integer('revision').notNull().default(1),
  updatedAt: text('updated_at').notNull()
});
