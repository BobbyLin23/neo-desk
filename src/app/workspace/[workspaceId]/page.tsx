import { redirect } from 'next/navigation'

import { InitWorkspaceButton } from '@/features/workspace/components/init-workspace-button'
import { getChats } from '@/features/chat/api/get-chats'

export default async function WorkspacePage({
  params,
}: {
  params: { workspaceId: string }
}) {
  const chats = await getChats(params.workspaceId)

  if (!chats.length) {
    return <InitWorkspaceButton workspaceId={params.workspaceId} />
  }

  return redirect(`/workspace/${params.workspaceId}/chat`)
}
