import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/swagger';
import { errorHandler } from './middleware/errorHandler';
import { generalLimiter } from './middleware/rateLimiter';
import routes from './routes';

const app = express();

// ─── Security Middleware ───
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(hpp());

// ─── Rate Limiting ───
app.use(generalLimiter);

// ─── Body Parsing ───
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Logging ───
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── Swagger Documentation ───
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SwoonRush API Docs',
}));

// ─── API Routes ───
app.use('/api', routes);

// ─── 404 Handler ───
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
  });
});

// ─── Global Error Handler ───
app.use(errorHandler);

export default app;
