import { betterFetch } from '@better-fetch/fetch'
import { NextResponse, type NextRequest } from 'next/server'

import type { auth } from '@/lib/auth'

type Session = typeof auth.$Infer.Session

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  )

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/workspace'],
}
