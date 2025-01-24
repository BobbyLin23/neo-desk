'use server'

import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { profile } from '@/db/schema/base'
import {
  chat,
  chatMember,
  chatMemberUser,
  chatMemberAi,
  aiStaff,
} from '@/db/schema/workspace'

export const getChat = async (chatId: string) => {
  try {
    const res = await db
      .select({
        chat: chat,
        member: chatMember,
        profile: profile,
        aiStaff: aiStaff,
        memberAi: chatMemberAi,
        memberUser: chatMemberUser,
      })
      .from(chat)
      .leftJoin(chatMember, eq(chat.id, chatMember.chatId))
      .leftJoin(chatMemberUser, eq(chatMember.id, chatMemberUser.memberId))
      .leftJoin(profile, eq(chatMemberUser.userId, profile.userId))
      .leftJoin(chatMemberAi, eq(chatMember.id, chatMemberAi.memberId))
      .leftJoin(aiStaff, eq(chatMemberAi.aiStaffId, aiStaff.id))
      .where(eq(chat.id, chatId))

    if (res.length === 0) return null

    const chatData = res[0].chat
    const members = res
      .map((row) => {
        const member = row.member
        if (!member) return null

        if (row.memberUser && row.profile) {
          return {
            ...member,
            profile: row.profile,
          }
        }

        if (row.memberAi && row.aiStaff) {
          return {
            ...member,
            aiStaff: row.aiStaff,
          }
        }

        return member
      })
      .filter((i) => i !== null)

    return {
      ...chatData,
      members,
    }
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get chat')
  }
}
