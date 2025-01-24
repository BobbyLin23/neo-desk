import { MessageSquarePlus } from 'lucide-react'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { getChats } from '@/features/chat/api/get-chats'

export default async function ChatPage({
  params,
}: {
  params: { workspaceId: string }
}) {
  const { workspaceId } = await params

  const chats = await getChats(workspaceId)

  if (chats.length > 0) {
    return redirect(`/workspace/${workspaceId}/chat/${chats[0].id}`)
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4 p-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MessageSquarePlus className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-xl font-semibold">No Chat</h3>
        <p className="text-sm text-muted-foreground">
          Start a new chat, explore the powerful features of AI assistant
        </p>
      </div>
      <Button className="mt-2">
        <MessageSquarePlus className="mr-2 h-4 w-4" />
        New Chat
      </Button>
    </div>
  )
}
