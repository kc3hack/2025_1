import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { corsMiddleware } from './middleware/cors';
import * as auth from './routes/auth';
import users from './routes/users';
import fortresses from './routes/fortresses';
import markings from './routes/markings';

const app = new Hono();

// ミドルウェアの適用
app.use('/*', corsMiddleware);

// 認証ルート
app.post("/api/auth/register", auth.register);
app.post("/api/auth/login", auth.login);

// ユーザールート
app.route('/api/users', users);

// 古墳ルート
app.route('/api/fortresses', fortresses);

// マーキングルート
app.route('/api/markings', markings);

// ポートを3002に変更
const PORT = 3002;
console.log(`Starting server on port ${PORT}...`);

serve({
  fetch: app.fetch,
  port: PORT
});

export default app; 