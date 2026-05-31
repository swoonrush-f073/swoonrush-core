import { Router } from 'express';

import * as cartController from '../controllers/cartController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import {
  addToCartValidator,
  updateCartItemValidator,
  removeCartItemValidator,
} from '../validators/cartValidator';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity, size]
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 10
 *               size:
 *                 type: string
 *                 enum: [XS, S, M, L, XL, XXL]
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item added to cart
 */
router.post('/add', addToCartValidator, validate, cartController.addToCart);

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId]
 *             properties:
 *               itemId:
 *                 type: string
 *                 format: uuid
 *               quantity:
 *                 type: integer
 *               size:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cart updated
 */
router.put('/update', updateCartItemValidator, validate, cartController.updateCartItem);

/**
 * @swagger
 * /api/cart/item/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete('/item/:itemId', removeCartItemValidator, validate, cartController.removeCartItem);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 */
router.delete('/clear', cartController.clearCart);

export default router;
