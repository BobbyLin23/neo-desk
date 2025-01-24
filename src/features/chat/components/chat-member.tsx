'use client'

import { Users } from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { getChat } from '@/features/chat/api/get-chat'
import { Input } from '@/components/ui/input'

export const ChatMember = ({
  members,
}: {
  members: NonNullable<Awaited<ReturnType<typeof getChat>>>['members']
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center rounded-md p-1 text-xs hover:bg-muted">
          <Users className="mr-1 size-3" />
          <span>{members.length}</span>
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-2">
        <SheetHeader>
          <SheetTitle>Members</SheetTitle>
          <SheetDescription className="hidden" />
        </SheetHeader>
        <Input placeholder="Search" />
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <div key={member.id}>
              {member.type === 'ai' && 'aiStaff' in member
                ? member.aiStaff?.name
                : 'profile' in member
                  ? member.profile?.id
                  : member.nickname}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
