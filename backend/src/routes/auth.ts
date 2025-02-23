import { Context } from 'hono';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    const user = await prisma.user.create({
      data: {
        user_name: username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET);
    return c.json({
      status: 'login_success',
      token,
      userId: user.user_id
    });
  } catch (error) {
    return c.json({ error: "ユーザー登録に失敗しました" }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();
    
    const existingUser = await prisma.user.findFirst({
      where: { user_name: username },
    });

    if (existingUser) {
      if (!(await bcrypt.compare(password, existingUser.password))) {
        return c.json({
          error: "パスワードが間違っています",
          details: "正しいパスワードを入力してください"
        }, 401);
      }

      const token = jwt.sign({ userId: existingUser.user_id }, JWT_SECRET);
      return c.json({
        status: 'login_success',
        message: 'ログインに成功しました',
        token,
        userId: existingUser.user_id
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = await prisma.user.create({
        data: {
          user_name: username,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.user_id }, JWT_SECRET);
      return c.json({
        status: 'login_success',
        message: '新規登録が完了しました',
        token,
        userId: newUser.user_id
      });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return c.json({
      error: "認証に失敗しました",
      details: error instanceof Error ? error.message : "不明なエラーが発生しました"
    }, 400);
  }
}; 