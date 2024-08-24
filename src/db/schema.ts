import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    password: text('password').notNull(),
    myToken: text('token').notNull(),
    email: text('email').unique().notNull(),
});

export const todoTable = sqliteTable('todo', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
    deadlineAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const channelTable = sqliteTable('channel', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    userId: integer('user_id')
        .notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),
});

export const contentTable = sqliteTable('content', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    channelId: integer('channel_id')
        .notNull()
        .references(() => channelTable.id, { onDelete: 'cascade' }),
    createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

// updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type InsertTodo = typeof todoTable.$inferInsert;
export type SelectTodo = typeof todoTable.$inferSelect;
export type InsertChannel = typeof channelTable.$inferInsert;
export type SelectChannel = typeof channelTable.$inferSelect;
export type InsertContent = typeof contentTable.$inferInsert;
export type SelectContent = typeof contentTable.$inferSelect;