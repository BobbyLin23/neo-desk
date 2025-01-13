import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/features/workspace/components/app-sidebar'

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

  const pathname = (await headers()).get('x-pathname') || ''

  const showSidebar = !pathname.includes('/workspace/create')

  return (
    <SidebarProvider>
      {showSidebar && <AppSidebar workspaceId={params.workspaceId} />}
      <main>{children}</main>
    </SidebarProvider>
  )
}
