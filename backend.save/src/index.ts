import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routes/auth';

const app = new Hono();

// CORSの設定を更新
app.use('/*', cors({
  origin: ['http://localhost:3000'],  // フロントエンドのポートを3000に修正
  allowMethods: ['POST', 'GET', 'OPTIONS'],  // 許可するメソッドを指定
  allowHeaders: ['Content-Type', 'Authorization'],  // 許可するヘッダーを指定
  credentials: true,
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
}));

// 基本的な動作確認用エンドポイント
app.get('/', (c) => {
  return c.json({ message: 'Hello, World!' });
});

// 認証ルートを追加
app.route('/', auth);

export default app; 