import { eq } from 'drizzle-orm'
import { User } from 'better-auth'

import { db } from '..'
import { profile } from '../schema/base'

export const createProfile = async (user: User) => {
  const existingProfile = await db
    .select()
    .from(profile)
    .where(eq(profile.userId, user.id))

  if (existingProfile.length > 0) {
    return existingProfile[0]
  }

  const newProfile = await db
    .insert(profile)
    .values({
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: user.image,
    })
    .returning()

  return newProfile
}
