import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth';
import users from './routes/users';

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || '0.0.0.0';

const app = new Hono();

// CORS設定を追加
app.use('/*', cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ルートにauthルーターをマウント
app.route('/api/auth', auth);
app.route('/api/users', users);

console.log(`Server is starting on ${host}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname: host
});
