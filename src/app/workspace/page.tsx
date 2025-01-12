import { UserButton } from '@/components/user-button'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function WorkspacePage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  if (!data?.session) {
    return redirect('/sign-in')
  }

  return (
    <div>
      Workspace
      <UserButton />
    </div>
  )
}
