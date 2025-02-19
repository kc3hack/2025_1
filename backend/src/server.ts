import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello Hono!'));


const port = process.env.PORT || 3005;


console.log(`Server is running on http://localhost:${port}`);

Bun.serve({
  fetch: app.fetch,
  port: Number(port),
  hostname : "127.0.0.2"
});
