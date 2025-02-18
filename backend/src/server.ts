import { Hono } from 'hono'

// サーバーのインスタンスを作成
const app = new Hono()

// ルートにGETリクエストが来た時の処理
app.get('/', (c) => {
  return c.text('Hello, world!')  // シンプルなレスポンスを返す
})

// 他にもエンドポイントを追加できるよ
app.get('/hello', (c) => {
  return c.json({ message: 'Hello, Hono!' })  // JSON形式のレスポンス
})

// Bun.js でサーバーを起動
app.fire()  // これで Bun.js のサーバーを起動できるよ
