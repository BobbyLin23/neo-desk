import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'

export const useAuth = () => {
  const router = useRouter()

  const { signIn, signOut } = authClient

  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (
    provider: 'github' | 'google',
    callbackURL?: string,
  ) => {
    await signIn.social(
      {
        provider,
        callbackURL: callbackURL || '/workspace',
      },
      {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          toast.success('Login successful')
        },
        onError: (ctx) => {
          setIsLoading(false)
          console.log(ctx)
          toast.error(ctx.error.message)
        },
      },
    )
  }

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        },
      },
    })
  }

  return { handleSocialLogin, isLoading, handleLogout }
}
