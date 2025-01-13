'use client'

import { useEffect, useTransition } from 'react'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { initWorkspace } from '../api/init-workspace'

export function InitWorkspaceButton({ workspaceId }: { workspaceId: string }) {
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      try {
        await initWorkspace(workspaceId)
      } catch (error) {
        console.error('Init workspace failed:', error)
      }
    })
  }, [])

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
