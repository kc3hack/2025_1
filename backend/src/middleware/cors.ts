import { cors } from 'hono/cors';

export const corsMiddleware = cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: false,
  maxAge: 86400,
  exposeHeaders: ['Content-Length', 'X-Content-Type-Options'],
}); 