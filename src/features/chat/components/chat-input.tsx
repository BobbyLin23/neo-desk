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
import { Textarea } from '@/components/ui/textarea'

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
      className="absolute bottom-0 left-0 right-0 bg-background/80 p-4 backdrop-blur"
    >
      <div className="relative flex items-end gap-2 rounded-xl border bg-background/80">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="发送消息..."
          className="relative mb-6 min-h-6 flex-1 resize-none rounded-xl border-none py-3 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          style={{
            minHeight: '24px',
            maxHeight: '200px',
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = `${target.scrollHeight}px`
          }}
        />

        <div className="absolute bottom-3 right-4 flex items-center gap-2">
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
