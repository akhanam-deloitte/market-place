import express from 'express';
const router = express.Router();

import authRoutes from './authRoutes';
import itemRoutes from './itemRoutes';
import transactionRoutes from './transactionRoutes'
import { verifyToken } from '../middleware/authMiddleware';

router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/transactions',verifyToken, transactionRoutes);


export default router;