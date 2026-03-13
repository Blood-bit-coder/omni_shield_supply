<<<<<<< HEAD
export interface SupplyItem {
  id: number
  itemId: string
  owner: string
  quantity: number
  isShipped: boolean
  created: string
  record?: string
}

export interface Transfer {
  id: number
  itemId: string
  fromNode: string
  toNode: string
  timestamp: string
  status: 'completed' | 'pending' | 'in-transit'
}

export interface AleoExecutionResult {
  success: boolean
  outputs?: string[]
  error?: string
}

export interface WalletState {
  connected: boolean
  address: string | null
  connecting: boolean
  programIds: string[]
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
=======
export interface SupplyItem {
  id: number
  itemId: string
  owner: string
  quantity: number
  isShipped: boolean
  created: string
  record?: string
}

export interface Transfer {
  id: number
  itemId: string
  fromNode: string
  toNode: string
  timestamp: string
  status: 'completed' | 'pending' | 'in-transit'
}

export interface AleoExecutionResult {
  success: boolean
  outputs?: string[]
  error?: string
}

export interface WalletState {
  connected: boolean
  address: string | null
  connecting: boolean
  programIds: string[]
}

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}