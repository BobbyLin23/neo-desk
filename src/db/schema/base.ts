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
    .references(() => user.id, { onDelete: 'cascade' }),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role')
    .notNull()
    .$default(() => 'user'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})
