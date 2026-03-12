import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import WalletConnector from './WalletConnector'
import { motion } from 'framer-motion'

interface NavbarProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/inventory', label: 'Inventory', icon: '📦' },
  { path: '/transfers', label: 'Transfers', icon: '🚚' },
  { path: '/analytics', label: 'Analytics', icon: '📈' }
]

export default function Navbar({ showToast }: NavbarProps) {
  const location = useLocation()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white text-2xl">🔰</span>
              </motion.div>
              <div>
                <motion.span
                  className="text-white font-bold text-2xl block"
                  animate={{ textShadow: ['0 0 5px #3b82f6', '0 0 20px #8b5cf6', '0 0 5px #3b82f6'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Omni<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Shield</span>
                </motion.span>
                <span className="text-xs text-gray-400">Powered by Aleo</span>
              </div>
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className={`relative px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hoveredItem === item.path && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
          
          <WalletConnector showToast={showToast} />
        </div>
      </div>
    </motion.nav>
  )
}