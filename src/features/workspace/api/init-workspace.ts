'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import {
  aiStaff,
  chat,
  chatMember,
  chatMemberUser,
  chatMemberAi,
  workspace,
} from '@/db/schema/workspace'

export async function initWorkspace(workspaceId: string) {
  try {
    // 1. Get workspace info
    const current_workspace = await db
      .select()
      .from(workspace)
      .where(eq(workspace.id, workspaceId))

    if (!current_workspace.length) {
      throw new Error('工作区不存在')
    }

    const workspace_name = current_workspace[0].name

    // 2. Create system prompt
    const systemPrompt = `
    - You are the intelligent assistant for workspace ${workspace_name}...
    `

    // 3. Create AI assistant
    const [ai_staff] = await db
      .insert(aiStaff)
      .values({
        name: `${workspace_name}'s Assistant`,
        description: `${workspace_name}'s Assistant`,
        workspaceId,
        role: 'assistant',
        provider: 'deepseek',
        modelName: 'deepseek-chat',
        source: 'workspace',
        systemPrompt,
        temperature: '0.7',
        maxTokens: '4096',
      })
      .returning()

    // 4. Create group chat
    const [all_chat] = await db
      .insert(chat)
      .values({
        workspaceId,
        name: `${workspace_name}'s Group Chat`,
        type: 'group',
        description: `${workspace_name}'s Group Chat with all members`,
      })
      .returning()

    // 5. Add user to group chat
    const [chatMember_user] = await db
      .insert(chatMember)
      .values({
        chatId: all_chat.id,
        type: 'owner',
        lastReadAt: new Date(),
      })
      .returning()

    await db.insert(chatMemberUser).values({
      memberId: chatMember_user.id,
      userId: current_workspace[0].userId,
    })

    // 6. Add AI assistant to group chat
    const [chatMember_ai] = await db
      .insert(chatMember)
      .values({
        chatId: all_chat.id,
        type: 'ai',
        lastReadAt: new Date(),
      })
      .returning()

    await db.insert(chatMemberAi).values({
      memberId: chatMember_ai.id,
      aiStaffId: ai_staff.id,
    })

    return true
  } catch (error) {
    console.error('Init workspace failed:', error)
    throw error
  }
}
