import { Request, Response } from 'express';
import { Transaction, Item } from '../models';
import { Op } from 'sequelize';

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { itemId, sellerId, type } = req.body;
    const user = (req as any).user;

    if (!itemId || !sellerId || !type) {
      res.status(400).json({ message: 'itemId, sellerId, and type are required' });
      return;
    }

    if (!user?.id) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Prevent buyer = seller
    if (user.id === sellerId) {
      res.status(400).json({ message: 'Cannot buy/trade your own item' });
      return;
    }

    // Optional: check if item exists
    const item = await Item.findByPk(itemId);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    const transaction = await Transaction.create({
      buyerId: user.id,
      sellerId,
      itemId,
      type, // must be 'BUY' or 'TRADE'
      status: 'PENDING'
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create transaction',
      error: (error as Error).message
    });
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const transactions = await Transaction.findAll({
            where: {
                [Op.or]: [
                    { buyerId: userId },
                    { sellerId: userId }
                ]
            }
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get transactions', error: err });
    }
};

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
};

export const updateTransactionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const transaction:any = await Transaction.findByPk(id);

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    transaction.status = status; // must be one of "PENDING", "COMPLETED", "CANCELLED"
    await transaction.save();

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error updating transaction', error: (err as Error).message });
  }
};
