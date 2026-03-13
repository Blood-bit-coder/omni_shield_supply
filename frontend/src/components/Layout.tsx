<<<<<<< HEAD
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { toasts, showToast } = useToast()

  // Create confetti effect
  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.animationDelay = Math.random() * 2 + 's'
      confetti.style.background = `linear-gradient(135deg, hsl(${Math.random() * 360}, 100%, 50%), hsl(${Math.random() * 360}, 100%, 50%))`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 3000)
    }
  }

  useEffect(() => {
    createConfetti()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      {/* Animated Orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <Navbar showToast={showToast} />
      
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>
      
      <Toast toasts={toasts} />
    </div>
  )
=======
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { toasts, showToast } = useToast()

  // Create confetti effect
  const createConfetti = () => {
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.animationDelay = Math.random() * 2 + 's'
      confetti.style.background = `linear-gradient(135deg, hsl(${Math.random() * 360}, 100%, 50%), hsl(${Math.random() * 360}, 100%, 50%))`
      document.body.appendChild(confetti)
      setTimeout(() => confetti.remove(), 3000)
    }
  }

  useEffect(() => {
    createConfetti()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      {/* Animated Orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      
      <Navbar showToast={showToast} />
      
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {children}
      </motion.main>
      
      <Toast toasts={toasts} />
    </div>
  )
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}