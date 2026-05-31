import rateLimit from 'express-rate-limit';

/** General API rate limiter: 100 requests per 15 minutes */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests, please try again later.',
  },
});

/** Strict rate limiter for auth endpoints: 20 requests per 15 minutes */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts, please try again later.',
  },
});
