import { text, timestamp, pgTable, pgEnum } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { user } from './auth-schema'

export const roleEnum = pgEnum('role', ['user', 'admin'])

export const profile = pgTable('profile', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role')
    .notNull()
    .$default(() => 'user'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const workspace = pgTable('workspace', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  inviteCode: text('invite_code')
    .notNull()
    .$defaultFn(() => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const length = 6
      return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)],
      ).join('')
    }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})
