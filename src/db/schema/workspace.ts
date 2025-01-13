import {
  text,
  timestamp,
  pgTable,
  pgEnum,
  boolean,
  json,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

import { user } from './auth-schema'
import { profile } from './base'

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
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const chatTypeEnum = pgEnum('chat_type', ['group', 'direct'])
export const chatMemberTypeEnum = pgEnum('chat_member_type', [
  'owner', // 群主
  'admin', // 管理员
  'member', // 普通成员
  'ai', // AI成员
])

export const chat = pgTable('chat', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  avatarUrl: text('avatar_url'),
  type: chatTypeEnum('type').notNull(),
  isArchived: boolean('is_archived').notNull().default(false),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const chatMember = pgTable('chat_member', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  chatId: text('chat_id')
    .notNull()
    .references(() => chat.id, { onDelete: 'cascade' }),
  type: chatMemberTypeEnum('type').notNull(),
  nickname: text('nickname'),
  lastReadAt: timestamp('last_read_at'),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const chatMemberUser = pgTable('chat_member_user', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  memberId: text('member_id')
    .notNull()
    .references(() => chatMember.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => profile.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
})

export const chatMemberAi = pgTable('chat_member_ai', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  memberId: text('member_id')
    .notNull()
    .references(() => chatMember.id, { onDelete: 'cascade' }),
  aiStaffId: text('ai_staff_id')
    .notNull()
    .references(() => aiStaff.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
})

export const aiRoleEnum = pgEnum('ai_role', [
  'assistant',
  'programmer',
  'writer',
  'designer',
  'analyst',
  'translator',
  'researcher',
])

export const aiProviderEnum = pgEnum('ai_provider', [
  'openai',
  'anthropic',
  'google',
  'mistral',
  'claude',
  'gemini',
  'deepseek',
  'grok',
])

export const aiStaffSourceEnum = pgEnum('ai_staff_source', [
  'user',
  'workspace',
  'system',
])

export const aiStaff = pgTable('ai_staff', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  workspaceId: text('workspace_id')
    .notNull()
    .references(() => workspace.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  role: aiRoleEnum('role').notNull(),
  provider: aiProviderEnum('provider').notNull(),
  modelName: text('model_name').notNull(),
  description: text('description'),
  systemPrompt: text('system_prompt'),
  temperature: text('temperature'),
  maxTokens: text('max_tokens'),
  settings: json('settings'),
  isActive: boolean('is_active').notNull().default(true),
  source: aiStaffSourceEnum('source').notNull().default('system'),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const messageTypeEnum = pgEnum('message_type', [
  'text',
  'image',
  'file',
  'system',
  'function_call',
  'function_return',
])

export const messageRoleEnum = pgEnum('message_role', [
  'system',
  'user',
  'assistant',
  'function',
])

export const chatMessage = pgTable('chat_message', {
  id: text('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  chatId: text('chat_id')
    .notNull()
    .references(() => chat.id),
  senderId: text('sender_id').notNull(),
  senderType: text('sender_type').notNull(),
  senderName: text('sender_name').notNull(),
  senderAvatar: text('sender_avatar'),

  type: messageTypeEnum('type').notNull(),
  role: messageRoleEnum('role').notNull(),
  content: text('content').notNull(),

  functionName: text('function_name'),
  functionArgs: json('function_args'),
  functionResponse: json('function_response'),

  promptTokens: text('prompt_tokens'),
  completionTokens: text('completion_tokens'),
  totalTokens: text('total_tokens'),

  parentId: text('parent_id'),
  replyToId: text('reply_to_id'),
  metadata: json('metadata'),
  isEdited: boolean('is_edited').notNull().default(false),
  isDeleted: boolean('is_deleted').notNull().default(false),
  createdAt: timestamp('created_at')
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})
