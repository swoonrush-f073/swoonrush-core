import { Request, Response, NextFunction } from 'express';

import { ApiError } from '../utils/ApiError';

/**
 * Global error handling middleware.
 * Must be registered last in the middleware chain.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
    return;
  }

  // Handle TypeORM unique constraint violations
  const errAny = err as unknown as Record<string, unknown>;
  if (errAny.code === '23505') {
    res.status(409).json({
      success: false,
      statusCode: 409,
      message: 'Duplicate entry. A record with this value already exists.',
      errors: [],
    });
    return;
  }

  // Handle TypeORM foreign key violations
  if (errAny.code === '23503') {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Referenced resource does not exist.',
      errors: [],
    });
    return;
  }

  // Unhandled errors
  console.error('Unhandled Error:', err);
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal server error',
    errors: [],
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      originalMessage: err.message,
    }),
  });
};
