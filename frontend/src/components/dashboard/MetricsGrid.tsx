import React from 'react'

interface MetricsGridProps {
  totalItems: number
  activeShipments: number
  completedTransfers: number
}

const metrics = [
  { label: 'Total Items', icon: '📦', change: '+12.5%' },
  { label: 'Active Shipments', icon: '🚚', change: '+5.2%' },
  { label: 'Completed Transfers', icon: '✅', change: '-2.1%' },
  { label: 'On-Time Delivery', icon: '⏱️', value: '99.9%', change: 'Above target' }
]

export default function MetricsGrid({ totalItems, activeShipments, completedTransfers }: MetricsGridProps) {
  const values = [totalItems, activeShipments, completedTransfers, '99.9%']

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:transform hover:scale-105 transition-all"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center mb-4">
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{values[index]}</div>
          <div className="text-gray-400 text-sm mb-3">{metric.label}</div>
          <div className="text-green-400 text-xs flex items-center gap-1">
            <span>▲</span> {metric.change}
          </div>
        </div>
      ))}
    </div>
  )
}