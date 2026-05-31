import dotenv from 'dotenv';

// Load environment variables before anything else
dotenv.config();

import app from './src/app';
import { AppDataSource } from './src/config/database';

const PORT = parseInt(process.env.PORT || '5001', 10);

const startServer = async (): Promise<void> => {
  try {
    // Initialize TypeORM DataSource
    await AppDataSource.initialize();
    console.log('✅ Database connected successfully');

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API Docs: http://localhost:${PORT}/api/docs`);
      console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

startServer();
