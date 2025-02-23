import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserInfo = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
      include: {
        parts: true,
        fortresses: true,
      },
    });

    if (!user) {
      return c.json({ error: "ユーザーが見つかりません" }, 404);
    }

    const { password, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword });
  } catch (error) {
    return c.json({ error: "ユーザー情報の取得に失敗しました" }, 400);
  }
}; 