import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4001;
const HOST = '0.0.0.0'; // Listen on all network interfaces

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    service: 'auth-service',
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get('/api/v1/auth/test', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Auth Service is working!',
    timestamp: new Date().toISOString()
  });
});

// Auth routes
app.post('/api/v1/auth/register', (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;
  
  res.json({
    success: true,
    message: 'Registration endpoint - to be implemented',
    data: { email, firstName, lastName }
  });
});

app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  res.json({
    success: true,
    message: 'Login endpoint - to be implemented',
    data: { 
      email,
      token: 'mock-jwt-token-will-be-replaced'
    }
  });
});

app.post('/api/v1/auth/logout', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Logout endpoint - to be implemented'
  });
});

app.post('/api/v1/auth/refresh', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Refresh token endpoint - to be implemented'
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
  console.log(`🔐 Auth Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test route: http://localhost:${PORT}/api/v1/auth/test`);
  console.log(`🌍 Access via Codespace: https://${process.env.CODESPACE_NAME}-${PORT}.preview.app.github.dev`);
});

export default app;
