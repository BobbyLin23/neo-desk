'use client'

import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { chat } from '@/db/schema/workspace'
import { cn } from '@/lib/utils'
import { formatTime } from '@/lib/time'

export type ChatItem = typeof chat.$inferSelect & {
  lastMessage?: string
  isActive?: boolean
  tag?: string
}

export const ChatItem = (chatData: ChatItem) => {
  const router = useRouter()

  return (
    <div
      onClick={() =>
        router.push(`/workspace/${chatData.workspaceId}/chat/${chatData.id}`)
      }
      className={cn(
        'flex h-16 w-full cursor-pointer items-center gap-3 rounded-md p-3 hover:bg-accent',
        chatData.isActive &&
          'bg-sky-50 hover:bg-sky-50 dark:bg-sky-950 hover:dark:bg-sky-950',
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={chatData.avatarUrl || ''} alt={chatData.name} />
        <AvatarFallback>{chatData.name[0]?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="max-w-full truncate text-sm">{chatData.name}</span>
            {chatData.tag && (
              <Badge className="px-1.5 text-xs font-normal">
                {chatData.tag}
              </Badge>
            )}
          </div>
          <span className="flex-shrink-0 text-xs text-muted-foreground">
            {formatTime(chatData.updatedAt)}
          </span>
        </div>
        <p className="truncate text-sm text-muted-foreground">
          {chatData.lastMessage || '123'}
        </p>
      </div>
    </div>
  )
}
