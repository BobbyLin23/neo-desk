'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold hover:opacity-70">NeoDesk</span>
          </Link>
        </div>

        <div className="hidden space-x-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            Pricing
          </Link>
          <Link
            href="#docs"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            Docs
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/auth">
            <Button>Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
