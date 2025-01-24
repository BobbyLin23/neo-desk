'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Calendar,
  FileText,
  LayoutDashboard,
  ListChecks,
  MessageCircle,
  Plus,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { workspace as workspaceSchema } from '@/db/schema/workspace'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { UserButton } from '@/components/user-button'
import { Button } from '@/components/ui/button'
import { AppSearch } from './app-search'
import { Hint } from '@/components/hint'
import { ModeToggle } from '@/components/mode-toggle'

export function AppSidebar({
  workspace,
}: {
  workspace: typeof workspaceSchema.$inferSelect
}) {
  const items = [
    {
      title: 'Dashboard',
      url: '/workspace',
      icon: LayoutDashboard,
    },
    {
      title: 'Chat',
      url: `/workspace/${workspace.id}/chat`,
      icon: MessageCircle,
    },
    {
      title: 'Calendar',
      url: '/workspace/calendar',
      icon: Calendar,
    },
    {
      title: 'Documents',
      url: '/workspace/documents',
      icon: FileText,
    },
    {
      title: 'Tasks',
      url: '/workspace/tasks',
      icon: ListChecks,
    },
  ]

  const pathname = usePathname()

  const [isNarrow, setIsNarrow] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observeWidth = () => {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const width = entry.contentRect.width
          setIsNarrow(width < 100)
        }
      })

      if (sidebarRef.current) {
        resizeObserver.observe(sidebarRef.current)
      }

      return () => resizeObserver.disconnect()
    }

    return observeWidth()
  }, [])

  return (
    <Sidebar ref={sidebarRef}>
      <SidebarHeader
        className={cn(
          'flex items-center',
          isNarrow ? 'flex-col gap-2' : 'flex-row justify-between',
        )}
      >
        <UserButton />
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>{workspace.name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <>
                <SidebarMenuItem
                  className={cn('my-2', isNarrow ? 'flex justify-center' : '')}
                >
                  <AppSearch isNarrow={isNarrow} />
                </SidebarMenuItem>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          'flex items-center',
                          isNarrow
                            ? 'h-fit flex-col justify-center gap-1'
                            : 'flex-row gap-2',
                          item.title !== 'Dashboard' &&
                            pathname.includes(item.url) &&
                            'bg-muted-foreground/10',
                        )}
                      >
                        <Hint label={isNarrow ? item.title : ''}>
                          <div
                            className={cn(
                              isNarrow && 'flex-col',
                              'flex items-center gap-2',
                            )}
                          >
                            <item.icon className="size-4" />
                            <span className="truncate">{item.title}</span>
                          </div>
                        </Hint>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
