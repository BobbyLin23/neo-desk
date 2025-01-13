import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getWorkspaces } from '@/features/workspace/api/get-workspaces'
import { auth } from '@/lib/auth'

export default async function WorkspacePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const workspaces = await getWorkspaces(session?.user.id as string)

  if (!workspaces.length) {
    return redirect('/workspace/create')
  } else {
    return redirect(`/workspace/${workspaces[0].id}`)
  }
}
