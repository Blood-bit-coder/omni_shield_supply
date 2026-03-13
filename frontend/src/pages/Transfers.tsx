import React, { useState } from 'react'
import { useSupplyChain } from '../hooks/useSupplyChain'
import { useAleoWallet } from '../hooks/useAleoWallet'
import { useToast } from '../hooks/useToast'

export default function Transfers() {
  const { items, transfers, transferItem } = useSupplyChain()
  const { connected } = useAleoWallet()
  const { showToast } = useToast()
  const [showForm, setShowForm] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [nextOwner, setNextOwner] = useState('')
  const [loading, setLoading] = useState(false)

  const pendingItems = items.filter(item => !item.isShipped)

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!connected) {
      showToast('Please connect your wallet first', 'error')
      return
    }
    if (!nextOwner.startsWith('aleo1')) {
      showToast('Address must start with aleo1', 'error')
      return
    }

    const item = items.find(i => i.id === parseInt(selectedItem))
    if (!item) {
      showToast('Item not found', 'error')
      return
    }

    setLoading(true)
    const timestamp = Math.floor(Date.now() / 1000)
    const result = await transferItem(item, nextOwner, timestamp)
    setLoading(false)
    
    if (result.success) {
      showToast('Item transferred successfully!', 'success')
      setShowForm(false)
      setSelectedItem('')
      setNextOwner('')
    } else {
      showToast(result.error || 'Failed to transfer item', 'error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'in-transit': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-yellow-500/20 text-yellow-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Transfer Management</h1>
        <button
          onClick={() => {
            if (pendingItems.length === 0) {
              showToast('No items available for transfer', 'error')
              return
            }
            setShowForm(!showForm)
          }}
          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
            showForm 
              ? 'bg-gray-600 hover:bg-gray-700 text-white' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
          }`}
        >
          <span>{showForm ? '✕' : '🚚'}</span>
          {showForm ? 'Cancel' : 'New Transfer'}
        </button>
      </div>

      {/* Transfer Form */}
      {showForm && (
        <div className="bg-gray-800/50 border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Create New Transfer</h3>
          <form onSubmit={handleTransfer} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Select Item</label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white"
                required
              >
                <option value="">Choose an item...</option>
                {pendingItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.itemId} - {item.quantity} units
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-2">Next Owner Address</label>
              <input
                type="text"
                value={nextOwner}
                onChange={(e) => setNextOwner(e.target.value)}
                placeholder="aleo1..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !selectedItem}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Transfer Item'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* No Items Warning */}
      {pendingItems.length === 0 && !showForm && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-8 text-center">
          <p className="text-yellow-400 text-lg mb-2">No items available for transfer</p>
          <p className="text-gray-400">Go to Inventory and manufacture a new item first.</p>
        </div>
      )}

      {/* Transfers Table */}
      <div className="bg-gray-800/50 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-6 text-gray-400">Item ID</th>
              <th className="text-left p-6 text-gray-400">From</th>
              <th className="text-left p-6 text-gray-400">To</th>
              <th className="text-left p-6 text-gray-400">Date</th>
              <th className="text-left p-6 text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {transfers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-12 text-gray-500">
                  No transfers yet
                </td>
              </tr>
            ) : (
              transfers.map(transfer => (
                <tr key={transfer.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-6 font-mono text-purple-400">{transfer.itemId}</td>
                  <td className="p-6 text-gray-400">{transfer.fromNode}</td>
                  <td className="p-6 text-gray-400">{transfer.toNode}</td>
                  <td className="p-6 text-gray-400">{transfer.timestamp}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(transfer.status)}`}>
                      {transfer.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}