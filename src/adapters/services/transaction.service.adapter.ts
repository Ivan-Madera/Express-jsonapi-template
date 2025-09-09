import {
  manageTransaction,
  commitTransaction,
  rollbackTransaction
} from '../../database/transaction'
import { type TransactionServicePort } from '../../domain/ports/user.ports'

export const createTransactionServiceAdapter = (): TransactionServicePort => ({
  begin: async () => {
    return await manageTransaction()
  },

  commit: async (transaction) => {
    await commitTransaction(transaction)
  },

  rollback: async (transaction, operation) => {
    await rollbackTransaction(transaction, operation)
  }
})
