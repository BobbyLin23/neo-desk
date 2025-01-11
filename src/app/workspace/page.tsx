import { UserButton } from '@/components/user-button'
import { authClient } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

export default async function WorkspacePage() {
  const { data } = await authClient.getSession()

  if (!data) {
    return redirect('/sign-in')
  }

  return (
    <div>
      Workspace
      <UserButton />
    </div>
  )
}
