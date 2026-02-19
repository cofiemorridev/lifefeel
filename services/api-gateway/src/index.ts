import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(compression() as any);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'api-gateway',
    version: '1.0.0'
  });
});

// API Routes
app.get('/api/v1', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Life Feel API',
    version: 'v1',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      services: '/api/v1/services',
      bookings: '/api/v1/bookings',
      payments: '/api/v1/payments'
    }
  });
});

// Test route
app.get('/api/v1/test', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API Gateway is working!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server on all interfaces
app.listen(PORT as number, HOST, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/v1`);
  console.log(`🧪 Test route: http://localhost:${PORT}/api/v1/test`);
  console.log(`🌍 Access via Codespace: https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev`);
});

export default app;
