'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import { SignInFlow } from '@/features/auth/types'
import { SignInCard } from '@/features/auth/components/sign-in-card'
import { SignUpCard } from '@/features/auth/components/sign-up-card'

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>('sign-in')

  return (
    <motion.div
      className="flex h-full items-center justify-center"
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: 6,
        ease: [0.42, 0, 0.58, 1],
        loop: Infinity,
      }}
      style={{
        background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
        backgroundSize: '200% 200%',
      }}
    >
      <div className="md:h-auto md:w-[420px]">
        <AnimatePresence mode="wait">
          {state === 'sign-in' ? (
            <motion.div
              key="sign-in"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <SignInCard setState={setState} />
            </motion.div>
          ) : (
            <motion.div
              key="sign-up"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SignUpCard setState={setState} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
