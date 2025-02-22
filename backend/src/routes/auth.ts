import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { sign } from "hono/jwt";

const auth = new Hono();
const prisma = new PrismaClient();

// JWT 秘密鍵（環境変数から取得）
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// 新規ユーザー登録
auth.post("/register", async (c) => {
  const { username, password } = await c.req.json();

  // 既にユーザーが存在するかチェック
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    return c.json({ error: "このユーザー名は既に使われています" }, 400);
  }

  // ユーザーをそのまま保存（ハッシュ化しない）
  const newUser = await prisma.user.create({
    data: { username, password },
  });

  return c.json({ message: "ユーザー登録成功", user: newUser });
});

// ログイン
auth.post("/login", async (c) => {
  const { username, password } = await c.req.json();

  // ユーザー名とパスワードが一致するか確認
  const user = await prisma.user.findUnique({
    where: { username, password },
  });

  if (!user) {
    return c.json({ error: "ユーザー名またはパスワードが違います" }, 401);
  }

  // JWT を発行
  const token = await sign({ userId: user.id, username: user.username }, SECRET_KEY);

  return c.json({ message: "ログイン成功", token });
});

export default auth;
