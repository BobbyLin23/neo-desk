'use server'

import { db } from '@/db'
import { workspace } from '@/db/schema/workspace'

type InsertWorkspace = typeof workspace.$inferInsert

export const createWorkspace = async (data: InsertWorkspace) => {
  const res = await db.insert(workspace).values(data).returning()
  return res[0]
}
