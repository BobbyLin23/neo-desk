import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/workspace/components/app-sidebar'
import { getWorkspace } from '@/features/workspace/api/get-workspace'

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { workspaceId: string }
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/sign-in')
  }

  const { workspaceId } = await params

  const workspace = await getWorkspace(workspaceId)

  if (!workspace) {
    return redirect('/workspace')
  }

  const pathname = (await headers()).get('x-pathname') || ''

  const showSidebar = !pathname.includes('/workspace/create')

  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar workspace={workspace} />}
      <main className="flex h-full w-full flex-1">{children}</main>
    </SidebarProvider>
  )
}
