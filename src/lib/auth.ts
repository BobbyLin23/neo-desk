import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { config } from 'dotenv'

import { db } from '@/db'
import { createProfile } from '@/db/actions/create-profile'
import * as authSchema from '@/db/schema/auth-schema'

config({ path: '.env.local' })

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...authSchema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createProfile(user)
        },
      },
    },
  },
  plugins: [nextCookies()],
})
