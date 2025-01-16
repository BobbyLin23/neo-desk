import { getChats } from '@/features/chat/api/get-chats'
import { ChatList } from '@/features/chat/components/chat-list'

export default async function ChatLayout({
  params,
  children,
}: {
  params: { workspaceId: string }
  children: React.ReactNode
}) {
  const { workspaceId } = await params

  const chats = await getChats(workspaceId)

  return (
    <div className="flex h-svh w-full">
      <ChatList chats={chats} />
      {children}
    </div>
  )
}
