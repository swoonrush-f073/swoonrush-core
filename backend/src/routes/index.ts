import { Router } from 'express';

import * as orderController from '../controllers/orderController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/role';
import { UserRole } from '../entities/User';

import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import cartRoutes from './cartRoutes';
import orderRoutes from './orderRoutes';
import paymentRoutes from './paymentRoutes';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/payments', paymentRoutes);

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: List all orders (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: All orders (paginated)
 */
router.get(
  '/admin/orders',
  authenticate,
  authorize(UserRole.ADMIN),
  orderController.getAllOrders
);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
