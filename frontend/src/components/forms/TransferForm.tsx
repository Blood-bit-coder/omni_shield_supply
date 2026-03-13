<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import { SupplyItem } from '@/types'

interface TransferFormProps {
  items: SupplyItem[]
  selectedItemId: number | null
  onSubmit: (itemId: number, nextOwner: string, timestamp: number) => Promise<void>
  onCancel: () => void
}

export default function TransferForm({ items, selectedItemId, onSubmit, onCancel }: TransferFormProps) {
  const [selectedItem, setSelectedItem] = useState('')
  const [nextOwner, setNextOwner] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedItemId) {
      setSelectedItem(selectedItemId.toString())
    }
  }, [selectedItemId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const timestamp = Math.floor(Date.now() / 1000)
    await onSubmit(parseInt(selectedItem), nextOwner, timestamp)
    setLoading(false)
  }

  // If no items available
  if (items.length === 0) {
    return (
      <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Transfer Item</h3>
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
          <p className="text-yellow-400">
            ⚠️ No items available for transfer
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Go to Inventory and manufacture an item first
          </p>
        </div>
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Transfer Item</h3>
      
      {/* Items counter */}
      <div className="mb-4 p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
        <p className="text-blue-400">
          📦 {items.length} item(s) ready for transfer
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Item Selection */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Select Item <span className="text-red-400">*</span>
          </label>
          
          <div className="relative">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full px-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: '#1F2937',
                color: 'white',
                border: '1px solid #4B5563'
              }}
              required
            >
              <option value="" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>
                -- Select an item --
              </option>
              {items.map(item => (
                <option 
                  key={item.id} 
                  value={item.id}
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    padding: '12px'
                  }}
                >
                  {item.itemId} | Qty: {item.quantity} | Owner: {item.owner.slice(0, 10)}...
                </option>
              ))}
            </select>
            
            {/* Dropdown arrow */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              ▼
            </div>
          </div>
          
          {/* Selected item preview */}
          {selectedItem && (
            <div className="mt-2 text-sm text-green-400">
              ✓ Selected: {items.find(i => i.id === parseInt(selectedItem))?.itemId}
            </div>
          )}
        </div>

        {/* Next Owner Address */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Next Owner Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={nextOwner}
            onChange={(e) => setNextOwner(e.target.value)}
            placeholder="aleo1..."
            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: '#374151',
              color: 'white',
              border: '1px solid #4B5563'
            }}
            required
          />
          <p className="text-gray-500 text-xs mt-1">
            Enter the Aleo address of the new owner
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !selectedItem}
            className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              color: 'white',
              cursor: loading || !selectedItem ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Transfer Item'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all"
            style={{ color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Quick Select Buttons - Backup if dropdown doesn't work */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-sm mb-3">Quick Select (click to choose):</p>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item.id.toString())}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                selectedItem === item.id.toString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {item.itemId}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
=======
import React, { useState, useEffect } from 'react'
import { SupplyItem } from '@/types'

interface TransferFormProps {
  items: SupplyItem[]
  selectedItemId: number | null
  onSubmit: (itemId: number, nextOwner: string, timestamp: number) => Promise<void>
  onCancel: () => void
}

export default function TransferForm({ items, selectedItemId, onSubmit, onCancel }: TransferFormProps) {
  const [selectedItem, setSelectedItem] = useState('')
  const [nextOwner, setNextOwner] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedItemId) {
      setSelectedItem(selectedItemId.toString())
    }
  }, [selectedItemId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const timestamp = Math.floor(Date.now() / 1000)
    await onSubmit(parseInt(selectedItem), nextOwner, timestamp)
    setLoading(false)
  }

  // If no items available
  if (items.length === 0) {
    return (
      <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Transfer Item</h3>
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
          <p className="text-yellow-400">
            ⚠️ No items available for transfer
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Go to Inventory and manufacture an item first
          </p>
        </div>
        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
        >
          Back
        </button>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-white mb-4">Transfer Item</h3>
      
      {/* Items counter */}
      <div className="mb-4 p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
        <p className="text-blue-400">
          📦 {items.length} item(s) ready for transfer
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Item Selection */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Select Item <span className="text-red-400">*</span>
          </label>
          
          <div className="relative">
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full px-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: '#1F2937',
                color: 'white',
                border: '1px solid #4B5563'
              }}
              required
            >
              <option value="" style={{ backgroundColor: '#1F2937', color: '#9CA3AF' }}>
                -- Select an item --
              </option>
              {items.map(item => (
                <option 
                  key={item.id} 
                  value={item.id}
                  style={{ 
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    padding: '12px'
                  }}
                >
                  {item.itemId} | Qty: {item.quantity} | Owner: {item.owner.slice(0, 10)}...
                </option>
              ))}
            </select>
            
            {/* Dropdown arrow */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              ▼
            </div>
          </div>
          
          {/* Selected item preview */}
          {selectedItem && (
            <div className="mt-2 text-sm text-green-400">
              ✓ Selected: {items.find(i => i.id === parseInt(selectedItem))?.itemId}
            </div>
          )}
        </div>

        {/* Next Owner Address */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Next Owner Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={nextOwner}
            onChange={(e) => setNextOwner(e.target.value)}
            placeholder="aleo1..."
            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: '#374151',
              color: 'white',
              border: '1px solid #4B5563'
            }}
            required
          />
          <p className="text-gray-500 text-xs mt-1">
            Enter the Aleo address of the new owner
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !selectedItem}
            className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              color: 'white',
              cursor: loading || !selectedItem ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Processing...' : 'Transfer Item'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all"
            style={{ color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Quick Select Buttons - Backup if dropdown doesn't work */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-gray-400 text-sm mb-3">Quick Select (click to choose):</p>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedItem(item.id.toString())}
              className={`px-3 py-1.5 rounded-lg text-sm transition ${
                selectedItem === item.id.toString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {item.itemId}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}