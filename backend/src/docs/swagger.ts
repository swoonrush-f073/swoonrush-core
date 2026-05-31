import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SwoonRush API',
      version: '1.0.0',
      description:
        'SwoonRush E-Commerce Backend API — Express + TypeORM + PostgreSQL. Drama-inspired fashion for every fan.',
      contact: {
        name: 'SwoonRush',
        email: 'swoonrush@gmail.com',
        url: 'https://swoonrush.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5001}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT access token',
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication & user management' },
      { name: 'Products', description: 'Product catalog' },
      { name: 'Cart', description: 'Shopping cart' },
      { name: 'Orders', description: 'Order management' },
      { name: 'Payments', description: 'Razorpay payment integration' },
      { name: 'Admin', description: 'Admin-only endpoints' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
