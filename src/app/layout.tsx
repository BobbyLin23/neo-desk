import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/query-provider'

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Neo Desk',
  description: 'AI-powered workspace for you!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
