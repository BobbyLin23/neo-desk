import { NextResponse, type NextRequest } from 'next/server'
import { betterFetch } from '@better-fetch/fetch'

import type { auth } from '@/lib/auth'

type Session = typeof auth.$Infer.Session

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session | null>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  )

  // 如果没有 session，直接重定向到登录页
  if (!session) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/workspace/:path*', '/settings/:path*', '/api/workspace/:path*'],
}
