'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { workspace } from '@/db/schema/base'

export const getWorkspaces = async (userId: string) => {
  return await db.select().from(workspace).where(eq(workspace.userId, userId))
}
