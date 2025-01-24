'use client'

import { usePathname } from 'next/navigation'

import { ChatItem } from './chat-item'

export const ChatList = ({ chats }: { chats: ChatItem[] }) => {
  const pathname = usePathname()

  const chatId = pathname.split('/').pop()

  return (
    <div className="flex w-[300px] flex-col gap-1 border-r p-2">
      {chats?.map((chat) => (
        <ChatItem key={chat.id} {...chat} isActive={chat.id === chatId} />
      ))}
    </div>
  )
}
