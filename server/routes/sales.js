import express from 'express';
import Sale from '../models/Sale.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all sales
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.find()
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single sale
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('items.product');
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a sale
router.post('/', authenticateToken, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { items, ...saleData } = req.body;

    // Update product stock
    for (const item of items) {
      const product = await Product.findById(item.product).session(session);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // Create sale
    const sale = new Sale({
      ...saleData,
      items,
      date: new Date()
    });
    await sale.save({ session });

    await session.commitTransaction();
    res.status(201).json(sale);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
});

// Get sales statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailySales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: today }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      }
    ]);

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthlySales = await Sale.aggregate([
      {
        $match: {
          date: { $gte: monthStart }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      daily: dailySales[0] || { total: 0, count: 0 },
      monthly: monthlySales[0] || { total: 0, count: 0 }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;