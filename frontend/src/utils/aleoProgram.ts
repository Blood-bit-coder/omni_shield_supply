import { ProgramManager, Account } from '@provablehq/sdk'
import { PROGRAM_SOURCE } from './constants'
import type { AleoExecutionResult } from '@/types'

export class AleoProgramManager {
  private programManager: ProgramManager | null = null
  private account: Account | null = null
  private initialized = false

  async initialize() {
    try {
      console.log('🚀 Initializing Aleo SDK...')
      
      this.programManager = new ProgramManager()
      this.account = new Account()
      this.programManager.setAccount(this.account)
      
      this.initialized = true
      console.log('✅ Aleo SDK initialized')
      console.log('📝 Address:', this.account.address().to_string())
      
      return true
    } catch (error) {
      console.error('❌ Failed to initialize Aleo:', error)
      return false
    }
  }

  async manufactureItem(receiver: string, itemId: string, quantity: number): Promise<AleoExecutionResult> {
    if (!this.initialized || !this.programManager) {
      return { success: false, error: 'Aleo not initialized' }
    }

    try {
      console.log('🔨 Manufacturing item:', { receiver, itemId, quantity })

      const inputs = [
        receiver,
        itemId,
        `${quantity}u64`
      ]

      const execution = await this.programManager.executeOffline(
        PROGRAM_SOURCE,
        'manufacture_item',
        inputs,
        false,
        false
      )

      const outputs = execution.getOutputs()
      console.log('✅ Manufacturing successful:', outputs)

      return { success: true, outputs }
    } catch (error) {
      console.error('❌ Manufacturing failed:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  async transferCustody(
    itemRecord: string, 
    nextOwner: string, 
    timestamp: number
  ): Promise<AleoExecutionResult> {
    if (!this.initialized || !this.programManager) {
      return { success: false, error: 'Aleo not initialized' }
    }

    try {
      console.log('🚚 Transferring custody:', { itemRecord, nextOwner, timestamp })

      const inputs = [
        itemRecord,
        nextOwner,
        `${timestamp}u32`
      ]

      const execution = await this.programManager.executeOffline(
        PROGRAM_SOURCE,
        'transfer_custody',
        inputs,
        false,
        false
      )

      const outputs = execution.getOutputs()
      console.log('✅ Transfer successful:', outputs)

      return { success: true, outputs }
    } catch (error) {
      console.error('❌ Transfer failed:', error)
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  getAddress(): string | null {
    return this.account?.address().to_string() || null
  }
}

export const aleoProgram = new AleoProgramManager()