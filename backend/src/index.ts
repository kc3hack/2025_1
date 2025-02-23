import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { corsMiddleware } from './middleware/cors';
import * as auth from './routes/auth';
import users from './routes/users';

const app = new Hono();

// ミドルウェアの適用
app.use('/*', corsMiddleware);

// 認証ルート
app.post("/api/auth/register", auth.register);
app.post("/api/auth/login", auth.login);

// ユーザールート
app.route('/api/users', users);

// ポート設定を明示的に
const PORT = 3001;
console.log(`Starting server on port ${PORT}...`);

serve({
  fetch: app.fetch,
  port: PORT
});

export default app; 