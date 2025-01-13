import {
  Calendar,
  Plus,
  MessageCircle,
  FileText,
  ListChecks,
  LayoutDashboard,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
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

export function AppSidebar({ workspaceId }: { workspaceId: string }) {
  const items = [
    {
      title: 'Dashboard',
      url: '/workspace',
      icon: LayoutDashboard,
    },
    {
      title: 'Chat',
      url: `/workspace/${workspaceId}/chat`,
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

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between">
        <UserButton />
        <Button variant="ghost" size="icon">
          <Plus />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace Name</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <>
                <SidebarMenuItem className="my-2">
                  <AppSearch />
                </SidebarMenuItem>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
