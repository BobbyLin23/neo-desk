'use client'

import { Loader, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'

import { useCurrentUser } from '../hooks/use-current-user'

export const UserButton = () => {
  const router = useRouter()

  const { session, isPending } = useCurrentUser()

  if (isPending) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />
  }

  if (!session) {
    return null
  }

  const { user } = session

  const { name, image } = user

  const avatarFallback = name!.charAt(0).toUpperCase()

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/auth')
        },
      },
    })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 transition hover:opacity-75">
          <AvatarImage src={image!} alt={name} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="center" className="w-60">
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
