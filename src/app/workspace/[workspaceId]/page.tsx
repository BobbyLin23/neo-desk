import { redirect } from 'next/navigation'

import { InitWorkspaceButton } from '@/features/workspace/components/init-workspace-button'
import { getChats } from '@/features/chat/api/get-chats'

export default async function WorkspacePage({
  params,
}: {
  params: { workspaceId: string }
}) {
  const { workspaceId } = await params

  const chats = await getChats(workspaceId)

  if (!chats.length) {
    return <InitWorkspaceButton workspaceId={workspaceId} />
  }

  return redirect(`/workspace/${workspaceId}/chat`)
}
