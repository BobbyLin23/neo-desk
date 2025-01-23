import { getChat } from '@/features/chat/api/get-chat'
import { ChatHeader } from '@/features/chat/components/chat-header'
import { ChatInput } from '@/features/chat/components/chat-input'

export default async function ChatPage({
  params,
}: {
  params: { chatId: string }
}) {
  const { chatId } = await params

  const chat = await getChat(chatId)

  return (
    <div className="relative flex h-full flex-1 flex-col">
      <ChatHeader chat={chat} />
      <div className="h-[2000px] flex-1 overflow-y-auto">123</div>
      <ChatInput />
    </div>
  )
}
