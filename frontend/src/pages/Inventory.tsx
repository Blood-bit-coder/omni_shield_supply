import React, { useState, useEffect } from 'react'

// Define types
interface SupplyItem {
  id: number
  itemId: string
  owner: string
  quantity: number
  isShipped: boolean
  created: string
}

export default function Inventory() {
  // ========== STATE MANAGEMENT ==========
  const [showForm, setShowForm] = useState(false)
  const [items, setItems] = useState<SupplyItem[]>([])
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Form states
  const [formData, setFormData] = useState({
    receiver: '',
    itemId: '',
    quantity: ''
  })

  // ========== LOAD DATA FROM LOCALSTORAGE ON START ==========
  useEffect(() => {
    loadFromLocalStorage()
  }, [])

  // ========== SAVE TO LOCALSTORAGE WHENEVER ITEMS CHANGE ==========
  useEffect(() => {
    if (items.length > 0) {
      saveToLocalStorage()
    }
  }, [items])

  const loadFromLocalStorage = () => {
    try {
      const savedItems = localStorage.getItem('inventory_items')
      if (savedItems) {
        setItems(JSON.parse(savedItems))
        showTemporaryMessage('✅ Data loaded from storage', 'success')
      } else {
        // Load sample data if no saved data exists
        loadSampleData()
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      loadSampleData()
    }
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('inventory_items', JSON.stringify(items))
      console.log('✅ Saved to localStorage')
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  const loadSampleData = () => {
    const sampleItems: SupplyItem[] = [
      {
        id: 1,
        itemId: 'SHIELD-2024-001',
        owner: 'aleo1factory...xyz',
        quantity: 500,
        isShipped: true,
        created: '2024-01-15 09:30 AM'
      },
      {
        id: 2,
        itemId: 'SHIELD-2024-002',
        owner: 'aleo1warehouse...abc',
        quantity: 250,
        isShipped: false,
        created: '2024-01-16 02:15 PM'
      },
      {
        id: 3,
        itemId: 'SHIELD-2024-003',
        owner: 'aleo1distributor...789',
        quantity: 1000,
        isShipped: true,
        created: '2024-01-17 11:20 AM'
      }
    ]
    setItems(sampleItems)
  }

  // ========== HELPER FUNCTIONS ==========
  const showTemporaryMessage = (message: string, type: 'success' | 'error') => {
    if (type === 'success') {
      setSuccessMessage(message)
      setTimeout(() => setSuccessMessage(''), 3000)
    } else {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    }
  }

  // ========== FORM HANDLING ==========
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setErrorMessage('')
  }

  const resetForm = () => {
    setFormData({
      receiver: '',
      itemId: '',
      quantity: ''
    })
    setShowForm(false)
    setErrorMessage('')
  }

  // ========== MANUFACTURE ITEM ==========
  const handleManufacture = () => {
    // Validate inputs
    if (!formData.receiver.trim()) {
      setErrorMessage('❌ Please enter receiver address')
      return
    }
    if (!formData.receiver.startsWith('aleo1')) {
      setErrorMessage('❌ Address must start with "aleo1"')
      return
    }
    if (!formData.itemId.trim()) {
      setErrorMessage('❌ Please enter item ID')
      return
    }
    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      setErrorMessage('❌ Please enter a valid quantity')
      return
    }

    setLoading(true)
    setErrorMessage('')

    // Simulate blockchain transaction
    setTimeout(() => {
      try {
        const newItem: SupplyItem = {
          id: Date.now(), // Use timestamp as ID to avoid conflicts
          itemId: formData.itemId,
          owner: formData.receiver,
          quantity: parseInt(formData.quantity),
          isShipped: false,
          created: new Date().toLocaleString()
        }

        const updatedItems = [newItem, ...items]
        setItems(updatedItems)
        showTemporaryMessage(`✅ Item ${formData.itemId} manufactured successfully!`, 'success')
        resetForm()
      } catch (error) {
        showTemporaryMessage('❌ Failed to manufacture item', 'error')
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  // ========== DELETE ITEM ==========
  const handleDeleteItem = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      showTemporaryMessage('✅ Item deleted successfully', 'success')
    }
  }

  // ========== CLEAR ALL DATA ==========
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete ALL items? This cannot be undone.')) {
      setItems([])
      localStorage.removeItem('inventory_items')
      showTemporaryMessage('✅ All items cleared', 'success')
    }
  }

  // ========== EXPORT DATA ==========
  const handleExport = () => {
    const dataStr = JSON.stringify(items, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `inventory_backup_${new Date().toISOString().slice(0,10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    showTemporaryMessage('✅ Data exported successfully', 'success')
  }

  // ========== STATS ==========
  const totalItems = items.length
  const shippedItems = items.filter(i => i.isShipped).length
  const pendingItems = items.filter(i => !i.isShipped).length

  return (
    <div className="space-y-6">
      {/* ===== HEADER WITH STATS ===== */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-6 border border-white/10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory Management</h1>
            <p className="text-gray-400">Your data is automatically saved</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalItems}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{shippedItems}</div>
              <div className="text-xs text-gray-400">Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{pendingItems}</div>
              <div className="text-xs text-gray-400">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition flex items-center gap-2"
          >
            <span>📥</span>
            Export
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition flex items-center gap-2"
          >
            <span>🗑️</span>
            Clear All
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
            showForm 
              ? 'bg-gray-600 hover:bg-gray-700' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/25'
          }`}
        >
          <span className="text-xl">{showForm ? '✕' : '➕'}</span>
          {showForm ? 'Cancel' : 'Manufacture New Item'}
        </button>
      </div>

      {/* ===== MANUFACTURE FORM ===== */}
      {showForm && (
        <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl p-6 animate-fadeIn">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🏭</span>
            Manufacture New Item
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Receiver Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="receiver"
                value={formData.receiver}
                onChange={handleInputChange}
                placeholder="aleo1..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Item ID <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="itemId"
                value={formData.itemId}
                onChange={handleInputChange}
                placeholder="e.g., SHIELD-2024-004"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Quantity <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                placeholder="Enter quantity"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Messages */}
            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-green-400 text-sm">
                {successMessage}
              </div>
            )}

            <button
              onClick={handleManufacture}
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          </div>
        </div>
      )}

      {/* ===== ITEMS TABLE ===== */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left p-6 text-gray-400 font-medium">Item ID</th>
                <th className="text-left p-6 text-gray-400 font-medium">Owner</th>
                <th className="text-left p-6 text-gray-400 font-medium">Quantity</th>
                <th className="text-left p-6 text-gray-400 font-medium">Status</th>
                <th className="text-left p-6 text-gray-400 font-medium">Created</th>
                <th className="text-left p-6 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-12 text-gray-500">
                    <div className="text-4xl mb-2">📦</div>
                    <p>No items in inventory</p>
                    <p className="text-sm mt-2">Click "Manufacture New Item" to create one</p>
                  </td>
                </tr>
              ) : (
                items.map(item => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition group">
                    <td className="p-6">
                      <span className="font-mono text-blue-400">{item.itemId}</span>
                    </td>
                    <td className="p-6">
                      <span className="font-mono text-sm text-gray-400" title={item.owner}>
                        {item.owner.slice(0, 10)}...{item.owner.slice(-4)}
                      </span>
                    </td>
                    <td className="p-6 text-white">{item.quantity}</td>
                    <td className="p-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                        item.isShipped 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {item.isShipped ? 'Shipped' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-6 text-gray-400 text-sm">{item.created}</td>
                    <td className="p-6">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span>Total {items.length} items</span>
        <span>💾 Data automatically saved</span>
      </div>
    </div>
  )
}