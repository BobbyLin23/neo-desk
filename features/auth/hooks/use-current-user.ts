import { authClient } from '@/lib/auth-client'

export const useCurrentUser = () => {
  const { data: session, isPending } = authClient.useSession()

  return {
    session,
    isPending,
  }
}
