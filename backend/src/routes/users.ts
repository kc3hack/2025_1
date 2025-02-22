import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const users = new Hono();
const prisma = new PrismaClient();

// ユーザー情報取得エンドポイント（IDによる取得）
users.get('/:id', async (c) => {
  try {
    const userId = c.req.param('id');
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // トークンの検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // トークンのユーザーIDとリクエストのIDが一致するか確認
    if (decoded.userId !== userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        user_name: true,
        random_parts_num: true,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(user);
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default users;
