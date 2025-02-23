import { Hono } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client';
import { z } from 'zod';
import { jwt } from 'hono/jwt';

const prisma = new PrismaClient();
const app = new Hono();

// JWTミドルウェアを追加
app.use('/*', jwt({ secret: process.env.JWT_SECRET || 'your-secret-key' }));

// 新しい古墳データのバリデーションスキーマ
const FortressDataSchema = z.object({
  name: z.string(),
  parts: z.array(z.object({
    id: z.string(),
    x: z.number(),
    y: z.number(),
    rotation: z.number(),
    grid: z.array(z.array(z.number()))
  })),
  score: z.number()
});

// 古墳の保存
app.post('/', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.userId;
    
    const data = await c.req.json();
    const validatedData = FortressDataSchema.parse(data);

    const fortress = await prisma.fortress.create({
      data: {
        userId,
        name: validatedData.name,
        parts: validatedData.parts,
        score: validatedData.score
      }
    });
    
    return c.json({ success: true, fortress });
  } catch (error) {
    console.error('Error details:', error);
    if (error instanceof z.ZodError) {
      return c.json({ 
        success: false, 
        error: 'Invalid data format', 
        details: error.errors 
      }, 400);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return c.json({ 
        success: false, 
        error: 'Database error', 
        code: error.code,
        message: error.message 
      }, 400);
    }
    return c.json({ 
      success: false, 
      error: 'Failed to save fortress',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 400);
  }
});

// ユーザーの全古墳を取得
app.get('/user/:userId', async (c) => {
  try {
    const userId = c.get('jwtPayload').userId;
    const fortresses = await prisma.fortress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        parts: true,
        score: true
      }
    });
    
    return c.json({ success: true, fortresses });
  } catch (error) {
    console.error('Error fetching fortresses:', error);
    return c.json({ success: false, error: 'Failed to fetch fortresses' }, 500);
  }
});

// スコアトップ3を取得
app.get('/top-scores', async (c) => {
  try {
    const topFortresses = await prisma.fortress.findMany({
      take: 3,
      orderBy: { score: 'desc' },
      select: {
        id: true,
        name: true,
        parts: true,
        score: true,
        user: {
          select: {
            user_name: true
          }
        }
      }
    });
    return c.json({ success: true, topFortresses });
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch top scores' }, 500);
  }
});

export default app; 