'use client'

import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { Header } from './_components/header'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Next Generation AI Tool
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 md:text-xl">
              Using AIs to create you own company to handle business!
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  <FaGithub className="mr-2 h-4 w-4" /> GitHub
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-32 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="rounded-xl border bg-white/50 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <p className="text-center text-gray-600">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: 'Modern Tech Stack',
    description:
      'Built with Next.js, TypeScript and Tailwind CSS for modern applications',
  },
  {
    title: 'Complete Authentication',
    description:
      'Integrated authentication system supporting multiple login methods',
  },
  {
    title: 'Real-time Features',
    description:
      'Built-in real-time updates and notification system for ultimate user experience',
  },
]
