'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { chat } from '@/db/schema/workspace'

export const getChats = async (workspaceId: string) => {
  try {
    const chats = await db
      .select()
      .from(chat)
      .where(eq(chat.workspaceId, workspaceId))
    return chats
  } catch (error) {
    console.error('Get chats failed:', error)
    throw error
  }
}
