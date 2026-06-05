import { body, param } from 'express-validator';

import { VALID_SIZES } from '../constants/sizes';

export const addToCartValidator = [
  body('productId')
    .notEmpty()
    .withMessage('Product ID is required')
    .isUUID()
    .withMessage('Product ID must be a valid UUID'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  body('size')
    .notEmpty()
    .withMessage('Size is required')
    .isIn([...VALID_SIZES])
    .withMessage(`Size must be one of: ${VALID_SIZES.join(', ')}`),
  body('color')
    .optional()
    .trim()
    .isLength({ max: 100 }),
];

export const updateCartItemValidator = [
  body('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isUUID()
    .withMessage('Item ID must be a valid UUID'),
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  body('size')
    .optional()
    .isIn([...VALID_SIZES])
    .withMessage(`Size must be one of: ${VALID_SIZES.join(', ')}`),
  body('color')
    .optional()
    .trim()
    .isLength({ max: 100 }),
];

export const removeCartItemValidator = [
  param('itemId')
    .notEmpty()
    .withMessage('Item ID is required')
    .isUUID()
    .withMessage('Item ID must be a valid UUID'),
];
