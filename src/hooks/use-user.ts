import { authClient } from '@/lib/auth-client'

export const useUser = () => {
  const { useSession } = authClient

  const { data } = useSession()

  return { user: data?.user }
}
