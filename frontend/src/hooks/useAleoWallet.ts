import { useState, useCallback } from 'react'

interface WalletState {
  connected: boolean
  address: string | null
  connecting: boolean
  programIds: string[]
}

export function useAleoWallet() {
  const [state, setState] = useState<WalletState>({
    connected: false,
    address: null,
    connecting: false,
    programIds: []
  })

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, connecting: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockAddress = 'aleo1' + Math.random().toString(36).substring(2, 15)
      
      setState({
        connected: true,
        address: mockAddress,
        connecting: false,
        programIds: ['omni_shield_supply_v1.aleo']
      })
      return true
    } catch (error) {
      console.error('Connection failed:', error)
      setState(prev => ({ ...prev, connected: false, connecting: false }))
      return false
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({
      connected: false,
      address: null,
      connecting: false,
      programIds: []
    })
  }, [])

  return {
    ...state,
    connect,
    disconnect
  }
}