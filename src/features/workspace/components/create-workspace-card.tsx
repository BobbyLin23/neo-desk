'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createWorkspace } from '../api/create-workspace'
import { useAuth } from '@/hooks/use-auth'

const formSchema = z.object({
  name: z.string().min(1),
})

export const CreateWorkspaceCard = () => {
  const router = useRouter()

  const { useSession } = useAuth()

  const { data: session } = useSession()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createWorkspace({
        ...values,
        userId: session?.user.id as string,
      })
      toast.success('Workspace created successfully')
      router.push(`/workspace/${res.id}`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create workspace')
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create a new workspace</CardTitle>
        <CardDescription>Create a new workspace to start</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Workspace
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
