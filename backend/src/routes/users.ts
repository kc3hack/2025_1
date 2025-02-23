import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const users = new Hono();
const prisma = new PrismaClient();

// 既存のユーザー情報取得（パーツ、要塞を含む）
users.get('/info/:userId', async (c) => {
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
});

// random_parts_num取得用のエンドポイント
users.get('/random/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    console.log('Received userId:', userId);

    const authHeader = c.req.header('Authorization');
    console.log('Auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: '認証が必要です' }, 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Decoded token:', decoded);
      
      if (typeof decoded === 'string' || decoded.userId !== userId) {
        return c.json({ error: '不正なトークンです' }, 403);
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return c.json({ error: '不正なトークンです' }, 403);
    }

    console.log('Attempting to find user with query:', {
      where: { user_id: userId },
      select: { user_id: true, random_parts_num: true }
    });

    const user = await prisma.user.findUnique({
      where: { 
        user_id: userId
      },
      select: {
        user_id: true,
        random_parts_num: true
      }
    });

    console.log('Found user:', user);

    if (!user) {
      return c.json({ error: 'ユーザーが見つかりません' }, 404);
    }

    const response = {
      user_id: user.user_id,
      random_parts_num: user.random_parts_num || 10
    };
    console.log('Sending response:', response);
    return c.json(response);

  } catch (error: any) {
    console.error('Detailed error:', error);
    return c.json({ 
      error: 'サーバーエラーが発生しました', 
      details: error?.message || '不明なエラー'
    }, 500);
  }
});

// Expressスタイルのrouter.putをHonoスタイルに修正
users.put('/random-parts', async (c) => {
    try {
        const authHeader = c.req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return c.json({ error: '認証が必要です' }, 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (typeof decoded === 'string') {
            return c.json({ error: '不正なトークンです' }, 403);
        }

        const userId = decoded.userId;
        
        const updatedUser = await prisma.user.update({
            where: { user_id: userId },
            data: {
                random_parts_num: {
                    increment: 1
                }
            }
        });

        return c.json({ success: true, random_parts_num: updatedUser.random_parts_num });
    } catch (error) {
        console.error('ランダムパーツ数の更新に失敗:', error);
        return c.json({ error: 'ランダムパーツ数の更新に失敗しました' }, 500);
    }
});

export default users; 