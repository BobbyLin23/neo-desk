'use client'

import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const ChatSearch = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center rounded-md p-1 text-xs hover:bg-muted">
          <Search className="size-4" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>Search for a chat</SheetDescription>
        </SheetHeader>
        <div className="mt-4 flex flex-col gap-2">
          <Input placeholder="Search" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
