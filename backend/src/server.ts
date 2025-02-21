import { Hono } from 'hono';

const app = new Hono();

// 基本的な動作確認用エンドポイント
app.get('/', (c) => {
  return c.json({ message: 'Hello, World!' })
});

// データベース接続確認用エンドポイント
app.get('/health', async (c) => {
  try {
    // ここにデータベース接続確認のコードを追加
    return c.json({ status: 'ok', message: 'Server is healthy!' })
  } catch (error: any) {
    return c.json({ status: 'error', message: error.message }, 500)
  }
});

const port = Number(process.env.PORT || 3001);

console.log(`Server is starting on port ${port}`);

export default {
  port,
  fetch: app.fetch
};
