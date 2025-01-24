'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChatMember } from './chat-member'
import { ChatSearch } from './chat-search'
import { AddMember } from './add-member'
import { ChatMenu } from './chat-menu'
import { getChat } from '../api/get-chat'
import { Plus } from 'lucide-react'

type ChatHeaderProps = {
  chat: Awaited<ReturnType<typeof getChat>>
}

export const ChatHeader = ({ chat }: ChatHeaderProps) => {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={chat?.avatarUrl || ''} alt={chat?.name || ''} />
          <AvatarFallback>{chat?.name?.slice(0, 2) || ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{chat?.name || ''}</h3>
            <ChatMember members={chat?.members || []} />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {chat?.description || 'No description'}
            </p>
            <button className="flex items-center justify-center rounded-md p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary">
              <Plus className="size-3" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ChatSearch />
        <AddMember />
        <ChatMenu />
      </div>
    </div>
  )
}
