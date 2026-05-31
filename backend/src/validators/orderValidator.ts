import { body, param } from 'express-validator';

export const createOrderValidator = [
  body('shippingAddress')
    .notEmpty()
    .withMessage('Shipping address is required')
    .isObject()
    .withMessage('Shipping address must be an object'),
  body('shippingAddress.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('shippingAddress.phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('shippingAddress.addressLine1')
    .trim()
    .notEmpty()
    .withMessage('Address line 1 is required'),
  body('shippingAddress.addressLine2')
    .optional()
    .trim(),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.pincode')
    .trim()
    .notEmpty()
    .withMessage('Pincode is required')
    .isLength({ min: 4, max: 10 })
    .withMessage('Pincode must be between 4 and 10 characters'),
  body('shippingAddress.country')
    .optional()
    .trim()
    .default('India'),
];

export const updateOrderStatusValidator = [
  param('id')
    .isUUID()
    .withMessage('Order ID must be a valid UUID'),
  body('orderStatus')
    .notEmpty()
    .withMessage('Order status is required')
    .isIn(['pending', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'])
    .withMessage(
      'Order status must be one of: pending, confirmed, packed, shipped, delivered, cancelled'
    ),
];
