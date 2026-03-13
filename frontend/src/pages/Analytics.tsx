<<<<<<< HEAD
import React from 'react'
import { useSupplyChain } from "../hooks/useSupplyChain"
import { useAleoWallet } from "../hooks/useAleoWallet"
import { useToast } from "../hooks/useToast"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function Analytics() {
  const { items, transfers } = useSupplyChain()

  // Calculate statistics
  const totalItems = items.length
  const shippedItems = items.filter(i => i.isShipped).length
  const pendingItems = items.filter(i => !i.isShipped).length
  const totalTransfers = transfers.length

  // Data for charts
  const statusData = [
    { name: 'Shipped', value: shippedItems },
    { name: 'Pending', value: pendingItems }
  ]

  const transferData = [
    { name: 'Jan', transfers: 4 },
    { name: 'Feb', transfers: 6 },
    { name: 'Mar', transfers: 8 },
    { name: 'Apr', transfers: 12 },
    { name: 'May', transfers: 15 },
    { name: 'Jun', transfers: totalTransfers }
  ]

  const COLORS = ['#00e676', '#ffc107']

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Items</div>
          <div className="text-4xl font-bold text-white">{totalItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Shipped Items</div>
          <div className="text-4xl font-bold text-green-400">{shippedItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Pending Items</div>
          <div className="text-4xl font-bold text-yellow-400">{pendingItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Transfers</div>
          <div className="text-4xl font-bold text-purple-400">{totalTransfers}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Item Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transfer Trend Line Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transfer Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transferData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="transfers" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Supply Chain Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">Average Transit Time</div>
            <div className="text-2xl font-bold text-white">2.4 days</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">Total Value Tracked</div>
            <div className="text-2xl font-bold text-white">$12.5M</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">On-Time Delivery Rate</div>
            <div className="text-2xl font-bold text-green-400">99.9%</div>
          </div>
        </div>
      </div>
    </div>
  )
=======
import React from 'react'
import { useSupplyChain } from "../hooks/useSupplyChain"
import { useAleoWallet } from "../hooks/useAleoWallet"
import { useToast } from "../hooks/useToast"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export default function Analytics() {
  const { items, transfers } = useSupplyChain()

  // Calculate statistics
  const totalItems = items.length
  const shippedItems = items.filter(i => i.isShipped).length
  const pendingItems = items.filter(i => !i.isShipped).length
  const totalTransfers = transfers.length

  // Data for charts
  const statusData = [
    { name: 'Shipped', value: shippedItems },
    { name: 'Pending', value: pendingItems }
  ]

  const transferData = [
    { name: 'Jan', transfers: 4 },
    { name: 'Feb', transfers: 6 },
    { name: 'Mar', transfers: 8 },
    { name: 'Apr', transfers: 12 },
    { name: 'May', transfers: 15 },
    { name: 'Jun', transfers: totalTransfers }
  ]

  const COLORS = ['#00e676', '#ffc107']

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Items</div>
          <div className="text-4xl font-bold text-white">{totalItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Shipped Items</div>
          <div className="text-4xl font-bold text-green-400">{shippedItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Pending Items</div>
          <div className="text-4xl font-bold text-yellow-400">{pendingItems}</div>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm mb-2">Total Transfers</div>
          <div className="text-4xl font-bold text-purple-400">{totalTransfers}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pie Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Item Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transfer Trend Line Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Transfer Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transferData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="transfers" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Supply Chain Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">Average Transit Time</div>
            <div className="text-2xl font-bold text-white">2.4 days</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">Total Value Tracked</div>
            <div className="text-2xl font-bold text-white">$12.5M</div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl">
            <div className="text-gray-400 text-sm">On-Time Delivery Rate</div>
            <div className="text-2xl font-bold text-green-400">99.9%</div>
          </div>
        </div>
      </div>
    </div>
  )
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}