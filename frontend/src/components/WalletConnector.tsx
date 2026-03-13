import React from 'react'
import { useAleoWallet } from '../hooks/useAleoWallet'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletConnectorProps {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void
}

export default function WalletConnector({ showToast }: WalletConnectorProps) {
  const { connected, address, connecting, connect, disconnect } = useAleoWallet()

  const handleConnect = async () => {
    const success = await connect()
    if (success) {
      showToast('✅ Wallet connected successfully!', 'success')
    } else {
      showToast('❌ Failed to connect wallet', 'error')
    }
  }

  return (
    <AnimatePresence mode="wait">
      {connected && address ? (
        <motion.div
          key="connected"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-center gap-3"
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-sm font-mono text-gray-300">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <motion.button
              onClick={disconnect}
              className="text-gray-400 hover:text-red-400 transition-colors"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.button
          key="disconnected"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleConnect}
          disabled={connecting}
          className="relative group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
          <motion.div
            className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {connecting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <span>🔌</span>
                <span>Connect Wallet</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                />
              </>
            )}
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}