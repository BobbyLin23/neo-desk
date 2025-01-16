'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { workspace } from '@/db/schema/workspace'

export const getWorkspace = async (workspaceId: string) => {
  const res = await db
    .select()
    .from(workspace)
    .where(eq(workspace.id, workspaceId))

  return res[0]
}
