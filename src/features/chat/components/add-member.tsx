'use client'

import { UserRoundPlus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const AddMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center rounded-md p-1 text-xs hover:bg-muted">
          <UserRoundPlus className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Add a member to the chat</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">Add Member</div>
      </DialogContent>
    </Dialog>
  )
}
