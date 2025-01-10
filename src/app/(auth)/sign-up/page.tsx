import Link from 'next/link'
import { GalleryVerticalEnd } from 'lucide-react'

import { AuthCard } from '@/features/auth/components/auth-card'
import { RegisterForm } from '@/features/auth/components/register-form'

export default function RegisterPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Neo Desk
      </Link>
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </div>
  )
}
