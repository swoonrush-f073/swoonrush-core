import { body } from 'express-validator';

import { VALID_SIZES } from '../constants/sizes';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 255 })
    .withMessage('Product name must be at most 255 characters'),
  body('slug')
    .trim()
    .notEmpty()
    .withMessage('Slug is required')
    .isLength({ max: 255 })
    .withMessage('Slug must be at most 255 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
  body('subTitle')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('currency')
    .optional()
    .trim()
    .isLength({ max: 10 }),
  body('originalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Original price must be a positive number'),
  body('offerPercentage')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Offer percentage must be between 0 and 100'),
  body('images')
    .notEmpty()
    .withMessage('Images are required')
    .isObject()
    .withMessage('Images must be an object'),
  body('images.front')
    .notEmpty()
    .withMessage('Front image is required')
    .isURL()
    .withMessage('Front image must be a valid URL'),
  body('sizes')
    .notEmpty()
    .withMessage('Sizes are required')
    .isArray({ min: 1 })
    .withMessage('At least one size is required'),
  body('sizes.*')
    .isIn([...VALID_SIZES])
    .withMessage(`Size must be one of: ${VALID_SIZES.join(', ')}`),
  body('colors')
    .notEmpty()
    .withMessage('Colors are required')
    .isArray({ min: 1 })
    .withMessage('At least one color is required'),
  body('colors.*.name')
    .notEmpty()
    .withMessage('Color name is required'),
  body('colors.*.hex')
    .notEmpty()
    .withMessage('Color hex is required')
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color hex must be a valid hex color (e.g. #E89CA9)'),
  body('material')
    .trim()
    .notEmpty()
    .withMessage('Material is required'),
  body('fit')
    .trim()
    .notEmpty()
    .withMessage('Fit is required'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be a boolean'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 }),
  body('tags')
    .optional()
    .isArray(),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

export const updateProductValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ max: 255 }),
  body('slug')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must contain only lowercase letters, numbers, and hyphens'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('originalPrice')
    .optional()
    .isFloat({ min: 0 }),
  body('offerPercentage')
    .optional()
    .isInt({ min: 0, max: 100 }),
  body('sizes')
    .optional()
    .isArray({ min: 1 }),
  body('sizes.*')
    .optional()
    .isIn([...VALID_SIZES])
    .withMessage(`Size must be one of: ${VALID_SIZES.join(', ')}`),
  body('colors')
    .optional()
    .isArray({ min: 1 }),
  body('colors.*.name')
    .optional()
    .notEmpty()
    .withMessage('Color name is required'),
  body('colors.*.hex')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color hex must be a valid hex color'),
  body('featured')
    .optional()
    .isBoolean(),
  body('inStock')
    .optional()
    .isBoolean(),
  body('stock')
    .optional()
    .isInt({ min: 0 }),
];
