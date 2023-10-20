import { relations, sql } from "drizzle-orm"
import { sqliteTable, text, integer, uniqueIndex, primaryKey } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  hashedPassword: text('hashed_password').notNull(),
  username: text('username').notNull(),
  displayName: text('display_name').notNull(),
  createdAt: integer('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  isAdmin: integer('is_admin', { mode: 'boolean' }).notNull().default(false),
}, (users) => ({
  emailIndex: uniqueIndex('email').on(users.username),
  usernameIdx: uniqueIndex('username').on(users.username),
}))

export const usersRelations = relations(users, ({ many }) => ({
  progressItems: many(progressItems),
}))

export const progressItems = sqliteTable('progress_items', {
  userId: integer('user_id').notNull().references(() => users.id),
  patternId: text('pattern_id').notNull(),
  experience: integer('experience').notNull().default(0),
  initiallyLearnedAt: integer('initially_learned_at').notNull(),
  lastExperienceGainAt: integer('last_experience_gain_at').notNull(),
}, (progressItems) => ({
  userAndPatternId: primaryKey(progressItems.userId, progressItems.patternId),
}))

export const progressItemsRelations = relations(progressItems, ({ one }) => ({
  user: one(users, {
    fields: [progressItems.userId],
    references: [users.id],
  }),
}))