import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '0.0.0.0';

const app = new Hono();

// CORSミドルウェアを先に設定
app.use('*', cors({
  origin: ['http://localhost:3000'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ルートにauthルーターをマウント
app.route('/', auth);

console.log(`Server is starting on ${host}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: host
});
