import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  updateTransactionStatus
} from '../controllers/transactionController';

const router = express.Router();

router.post('/', createTransaction); // Initiate transaction
router.get('/', getAllTransactions); // All transactions
router.get('/user/:userId', getUserTransactions); // Transactions for a user
router.put('/:id/status', updateTransactionStatus); // Update status

export default router;