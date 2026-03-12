import React, { useState } from 'react'

interface ManufactureFormProps {
  onSubmit: (receiver: string, itemId: string, quantity: number) => Promise<void>
  onCancel: () => void
}

export default function ManufactureForm({ onSubmit, onCancel }: ManufactureFormProps) {
  // ========== STATE MANAGEMENT ==========
  const [receiver, setReceiver] = useState('')
  const [itemId, setItemId] = useState('SHIELD-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'))
  const [quantity, setQuantity] = useState(100)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ========== VALIDATION ==========
  const validateForm = (): boolean => {
    if (!receiver.trim()) {
      setError('❌ Receiver address is required')
      return false
    }
    if (!receiver.startsWith('aleo1')) {
      setError('❌ Address must start with "aleo1"')
      return false
    }
    if (receiver.length < 10) {
      setError('❌ Address is too short')
      return false
    }
    if (!itemId.trim()) {
      setError('❌ Item ID is required')
      return false
    }
    if (quantity < 1) {
      setError('❌ Quantity must be at least 1')
      return false
    }
    if (quantity > 1000000) {
      setError('❌ Quantity cannot exceed 1,000,000')
      return false
    }
    return true
  }

  // ========== FORM HANDLING ==========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      await onSubmit(receiver, itemId, quantity)
      setSuccess('✅ Item manufactured successfully!')
      
      // Reset form after successful submission
      setTimeout(() => {
        setReceiver('')
        setItemId('SHIELD-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'))
        setQuantity(100)
        setSuccess('')
      }, 2000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '❌ Failed to manufacture item')
    } finally {
      setLoading(false)
    }
  }

  // ========== HANDLE QUANTITY CHANGE ==========
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      setQuantity(value)
    }
  }

  // ========== GENERATE RANDOM ITEM ID ==========
  const generateRandomId = () => {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    setItemId(`SHIELD-${year}-${randomNum}`)
  }

  return (
    <div className="bg-gray-800 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 mb-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🔨</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Manufacture New Item</h3>
            <p className="text-gray-400 text-sm">Create a new supply chain item</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-xl text-red-400 text-sm flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-800 rounded-xl text-green-400 text-sm flex items-center gap-2">
          <span>✅</span>
          <span>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Receiver Address */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Receiver Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="aleo1..."
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            disabled={loading}
            required
          />
          <p className="text-gray-500 text-xs mt-1">
            Enter the Aleo address that will receive this item
          </p>
        </div>

        {/* Item ID with Generate Button */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Item ID <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={generateRandomId}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 rounded-xl text-white transition flex items-center gap-2"
              disabled={loading}
            >
              <span>🎲</span>
              <span className="hidden sm:inline">Random</span>
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Unique identifier for this item (e.g., SHIELD-2024-001)
          </p>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-gray-400 text-sm font-medium mb-2">
            Quantity <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="1000000"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              disabled={loading}
              required
            />
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.max(1, prev - 10))}
                className="px-3 py-3 bg-gray-600 hover:bg-gray-500 rounded-l-xl text-white transition"
                disabled={loading}
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => setQuantity(prev => Math.min(1000000, prev + 10))}
                className="px-3 py-3 bg-gray-600 hover:bg-gray-500 rounded-r-xl text-white transition"
                disabled={loading}
              >
                +10
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Number of units to manufacture (1 - 1,000,000)
          </p>
        </div>

        {/* Form Summary */}
        {(receiver || itemId || quantity) && (
          <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-xl">
            <p className="text-xs text-blue-400 mb-1">📋 Summary</p>
            <p className="text-sm text-gray-300">
              Manufacturing <span className="text-white font-bold">{quantity}</span> unit(s) of{' '}
              <span className="text-white font-bold">{itemId}</span> for{' '}
              <span className="text-white font-bold">{receiver ? receiver.slice(0, 10) + '...' : 'receiver'}</span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <span>🔨</span>
                Manufacture Item
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-all disabled:opacity-50"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Quick Tips */}
      <div className="mt-4 p-3 bg-gray-700/30 rounded-xl border border-gray-700">
        <p className="text-xs text-gray-400 flex items-center gap-2">
          <span>💡</span>
          <span>Quick tips: Address must start with "aleo1". Item ID should be unique. Quantity between 1-1,000,000.</span>
        </p>
      </div>
    </div>
  )
}