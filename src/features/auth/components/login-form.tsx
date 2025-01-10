'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function LoginForm({
  className,
}: React.ComponentPropsWithoutRef<'form'>) {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <form
      className={cn('flex flex-col gap-y-6', className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@doe.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </Form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  )
}
