<<<<<<< HEAD
import { useState, useCallback } from 'react'
import type { SupplyItem, Transfer, AleoExecutionResult } from '../types'

export function useSupplyChain() {
  const [items, setItems] = useState<SupplyItem[]>([
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
      isShipped: false,
      created: '2024-01-17 10:00 AM'
    }
  ])
  
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: 1,
      itemId: 'SHIELD-2024-001',
      fromNode: 'aleo1factory...xyz',
      toNode: 'aleo1distributor...123',
      timestamp: '2024-01-15 10:30 AM',
      status: 'completed'
    },
    {
      id: 2,
      itemId: 'SHIELD-2024-002',
      fromNode: 'aleo1warehouse...abc',
      toNode: 'aleo1retailer...456',
      timestamp: '2024-01-16 03:45 PM',
      status: 'in-transit'
    }
  ])

  const [loading, setLoading] = useState(false)
  const [nextId, setNextId] = useState(4)

  const manufactureItem = useCallback(async (
    receiver: string,
    itemId: string,
    quantity: number
  ): Promise<AleoExecutionResult> => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newItem: SupplyItem = {
        id: nextId,
        itemId,
        owner: receiver,
        quantity,
        isShipped: false,
        created: new Date().toLocaleString()
      }
      
      setItems(prev => [newItem, ...prev])
      setNextId(prev => prev + 1)
      
      return { success: true, outputs: [JSON.stringify(newItem)] }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    } finally {
      setLoading(false)
    }
  }, [nextId])

  const transferItem = useCallback(async (
    item: SupplyItem,
    nextOwner: string,
    timestamp: number
  ): Promise<AleoExecutionResult> => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setItems(prev => prev.map(i => 
        i.id === item.id 
          ? { ...i, isShipped: true, owner: nextOwner }
          : i
      ))
      
      const newTransfer: Transfer = {
        id: transfers.length + 1,
        itemId: item.itemId,
        fromNode: item.owner,
        toNode: nextOwner,
        timestamp: new Date().toLocaleString(),
        status: 'in-transit'
      }
      
      setTransfers(prev => [newTransfer, ...prev])
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    } finally {
      setLoading(false)
    }
  }, [transfers.length])

  return {
    items,
    transfers,
    loading,
    manufactureItem,
    transferItem
  }
=======
import { useState, useCallback } from 'react'
import type { SupplyItem, Transfer, AleoExecutionResult } from '../types'

export function useSupplyChain() {
  const [items, setItems] = useState<SupplyItem[]>([
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
      isShipped: false,
      created: '2024-01-17 10:00 AM'
    }
  ])
  
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: 1,
      itemId: 'SHIELD-2024-001',
      fromNode: 'aleo1factory...xyz',
      toNode: 'aleo1distributor...123',
      timestamp: '2024-01-15 10:30 AM',
      status: 'completed'
    },
    {
      id: 2,
      itemId: 'SHIELD-2024-002',
      fromNode: 'aleo1warehouse...abc',
      toNode: 'aleo1retailer...456',
      timestamp: '2024-01-16 03:45 PM',
      status: 'in-transit'
    }
  ])

  const [loading, setLoading] = useState(false)
  const [nextId, setNextId] = useState(4)

  const manufactureItem = useCallback(async (
    receiver: string,
    itemId: string,
    quantity: number
  ): Promise<AleoExecutionResult> => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newItem: SupplyItem = {
        id: nextId,
        itemId,
        owner: receiver,
        quantity,
        isShipped: false,
        created: new Date().toLocaleString()
      }
      
      setItems(prev => [newItem, ...prev])
      setNextId(prev => prev + 1)
      
      return { success: true, outputs: [JSON.stringify(newItem)] }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    } finally {
      setLoading(false)
    }
  }, [nextId])

  const transferItem = useCallback(async (
    item: SupplyItem,
    nextOwner: string,
    timestamp: number
  ): Promise<AleoExecutionResult> => {
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setItems(prev => prev.map(i => 
        i.id === item.id 
          ? { ...i, isShipped: true, owner: nextOwner }
          : i
      ))
      
      const newTransfer: Transfer = {
        id: transfers.length + 1,
        itemId: item.itemId,
        fromNode: item.owner,
        toNode: nextOwner,
        timestamp: new Date().toLocaleString(),
        status: 'in-transit'
      }
      
      setTransfers(prev => [newTransfer, ...prev])
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    } finally {
      setLoading(false)
    }
  }, [transfers.length])

  return {
    items,
    transfers,
    loading,
    manufactureItem,
    transferItem
  }
>>>>>>> 04152c3a04bf1be989cc79a4773d290ba1b79e95
}