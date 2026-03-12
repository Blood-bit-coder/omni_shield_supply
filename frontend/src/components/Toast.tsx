import React from 'react'
import type { Toast } from '../types'

interface ToastProps {
  toasts: Toast[]
}

export default function Toast({ toasts }: ToastProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-24 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`px-6 py-4 rounded-xl backdrop-blur-xl border shadow-xl animate-slide-in ${
            toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
            toast.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  )
}