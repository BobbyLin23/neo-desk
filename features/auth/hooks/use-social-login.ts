import { toast } from 'sonner'

import { authClient } from '@/lib/auth-client'

export const useSocialLogin = () => {
  const handleSocialLogin = async (provider: 'github' | 'google') => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: '/dashboard',
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      }
    )
  }

  return {
    handleSocialLogin,
  }
}
