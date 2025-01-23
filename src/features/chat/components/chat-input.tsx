'use client'

import { useState } from 'react'
import {
  Expand,
  SendHorizontal,
  Smile,
  Scissors,
  AtSign,
  CirclePlus,
  ALargeSmall,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export const ChatInput = () => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setMessage('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute bottom-0 left-0 right-0 bg-background p-4 pb-6"
    >
      <div className="flex items-center gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="relative h-12 flex-1 pr-[220px] focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />

        <div className="absolute right-6 flex items-center gap-2">
          <button
            type="button"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <ALargeSmall className="size-4" />
          </button>
          <button
            type="button"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <Smile className="size-4" />
          </button>
          <button
            type="submit"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <Scissors className="size-4" />
          </button>
          <button
            type="button"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <AtSign className="size-4" />
          </button>
          <button
            type="button"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <CirclePlus className="size-4" />
          </button>
          <button
            type="button"
            className={cn('rounded-md p-1 opacity-50 hover:bg-muted')}
          >
            <Expand className="size-4" />
          </button>
          <button
            type="submit"
            disabled={!message.trim()}
            className={cn(
              'rounded-md p-1 opacity-50 hover:bg-muted',
              !message.trim() && 'cursor-not-allowed opacity-50',
            )}
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </form>
  )
}
