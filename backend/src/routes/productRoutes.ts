import { Router } from 'express';

import * as productController from '../controllers/productController';
import { authenticate } from '../middleware/auth';
import { authorize } from '../middleware/role';
import { validate } from '../middleware/validate';
import { UserRole } from '../entities/User';
import {
  createProductValidator,
  updateProductValidator,
} from '../validators/productValidator';

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
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
 *           default: 12
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: inStock
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, newest, name_asc, name_desc]
 *     responses:
 *       200:
 *         description: Paginated product list
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /api/products/slug/{slug}:
 *   get:
 *     summary: Get product by slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: lovely-runner-oversized
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/slug/:slug', productController.getProductBySlug);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, description, price, images, sizes, colors, material, fit]
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               images:
 *                 type: object
 *                 properties:
 *                   front:
 *                     type: string
 *               sizes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum: [XS, S, M, L, XL, XXL]
 *               colors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     hex:
 *                       type: string
 *               material:
 *                 type: string
 *               fit:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  createProductValidator,
  validate,
  productController.createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 */
router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  updateProductValidator,
  validate,
  productController.updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin only, soft delete)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  productController.deleteProduct
);

export default router;
