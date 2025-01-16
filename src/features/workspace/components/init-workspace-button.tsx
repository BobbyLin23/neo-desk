'use client'

import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { initWorkspace } from '@/features/workspace/api/init-workspace'

export function InitWorkspaceButton({ workspaceId }: { workspaceId: string }) {
  const { isPending } = useQuery({
    queryKey: ['init-workspace', workspaceId],
    queryFn: () => initWorkspace(workspaceId),
    retry: false,
    staleTime: Infinity,
  })

  return (
    isPending && (
      <div className="flex min-h-screen items-center justify-center">
        <Button disabled>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Initializing...
        </Button>
      </div>
    )
  )
}
