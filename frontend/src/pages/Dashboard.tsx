import React from 'react'
import { useSupplyChain } from '../hooks/useSupplyChain'
import { useAleoWallet } from '../hooks/useAleoWallet'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const { items, transfers } = useSupplyChain()
  const { connected, address } = useAleoWallet()
  const navigate = useNavigate()

  const totalItems = items.length
  const activeShipments = items.filter(i => i.isShipped).length
  const completedTransfers = transfers.filter(t => t.status === 'completed').length

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 p-8"
      >
        <div className="absolute inset-0 bg-grid opacity-20" />
        <h1 className="text-5xl font-bold mb-4">
          <span className="gradient-text">Enterprise Supply Chain</span>
          <br />
          <span className="text-white">Powered by Aleo</span>
        </h1>
        
        <p className="text-gray-300 text-lg max-w-2xl mb-8">
          Real-time tracking, immutable records, and complete transparency 
          for your global supply chain operations.
        </p>
        
        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{totalItems}</div>
            <div className="text-gray-400 text-sm">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{activeShipments}</div>
            <div className="text-gray-400 text-sm">Active Shipments</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">{completedTransfers}</div>
            <div className="text-gray-400 text-sm">Completed Transfers</div>
          </div>
        </div>
      </motion.div>

      {/* Wallet Status */}
      {connected && address && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 font-mono">
              Connected: {address.slice(0, 10)}...{address.slice(-4)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manage Inventory Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/inventory')}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
          <h3 className="text-2xl font-semibold text-white mb-2">Manage Inventory</h3>
          <p className="text-gray-400 mb-4">View and manage all your supply chain items</p>
          <div className="flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
            <span>Go to Inventory</span>
            <span className="ml-2">→</span>
          </div>
        </motion.div>

        {/* Manufacture New Item Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (!connected) {
              // Show toast or alert
              alert('Please connect your wallet first')
              return
            }
            navigate('/inventory?action=manufacture')
          }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10 rounded-2xl p-8 cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">🔨</div>
          <h3 className="text-2xl font-semibold text-white mb-2">Manufacture New Item</h3>
          <p className="text-gray-400 mb-4">Create a new supply item on the blockchain</p>
          <div className="flex items-center text-purple-400 group-hover:translate-x-2 transition-transform">
            <span>Start Manufacturing</span>
            <span className="ml-2">→</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Total Items</div>
          <div className="text-2xl font-bold text-white">{totalItems}</div>
        </div>
        <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4">
          <div className="text-gray-400 text-sm">In Transit</div>
          <div className="text-2xl font-bold text-white">{activeShipments}</div>
        </div>
        <div className="bg-gray-800/30 border border-white/5 rounded-xl p-4">
          <div className="text-gray-400 text-sm">Completed</div>
          <div className="text-2xl font-bold text-white">{completedTransfers}</div>
        </div>
      </motion.div>
    </div>
  )
}