import { Router } from 'express';

import * as paymentController from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create a Razorpay payment order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId]
 *             properties:
 *               orderId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Razorpay order created
 */
router.post('/create-order', authenticate, paymentController.createPaymentOrder);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId]
 *             properties:
 *               razorpayOrderId:
 *                 type: string
 *               razorpayPaymentId:
 *                 type: string
 *               razorpaySignature:
 *                 type: string
 *               orderId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Payment verified
 */
router.post('/verify', authenticate, paymentController.verifyPayment);

/**
 * @swagger
 * /api/payments/webhook:
 *   post:
 *     summary: Razorpay webhook handler
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook processed
 */
router.post('/webhook', paymentController.handleWebhook);

export default router;
