import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const auth = new Hono();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Prismaクライアントの接続テスト
prisma.$connect()
  .then(() => console.log('Successfully connected to database'))
  .catch((e) => console.error('Failed to connect to database:', e));

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ログイン/登録エンドポイント
auth.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    console.log('\n=== Authentication Request ===');
    console.log('Username:', username);

    // まず、ユーザー名で検索
    const existingUser = await prisma.user.findFirst({
      where: { user_name: username }
    });

    if (existingUser) {
      // パスワードを比較
      const isValidPassword = await bcrypt.compare(password, existingUser.password);
      
      if (isValidPassword) {
        // 同じユーザー名・パスワードの組み合わせの場合はログイン
        console.log('✅ LOGIN SUCCESS:', {
          username,
          userId: existingUser.user_id,
          timestamp: new Date().toISOString()
        });
        const token = jwt.sign({ userId: existingUser.user_id }, JWT_SECRET);
        return c.json({ 
          token, 
          userId: existingUser.user_id,
          status: 'login_success',
          message: 'ログインに成功しました'
        });
      } else {
        // パスワードが違う場合は認証エラー
        console.log('❌ LOGIN FAILED: Invalid password for user:', username);
        return c.json({ 
          error: 'パスワードが正しくありません',
          status: 'login_failed'
        }, 401);
      }
    }

    // ユーザーが存在しない場合は新規登録
    console.log('👤 REGISTER: Creating new user');
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        user_name: username,
        password: hashedPassword,
      }
    });

    console.log('✅ REGISTER SUCCESS:', {
      username,
      userId: newUser.user_id,
      timestamp: new Date().toISOString()
    });
    const token = jwt.sign({ userId: newUser.user_id }, JWT_SECRET);
    return c.json({ 
      token, 
      userId: newUser.user_id,
      status: 'register_success',
      message: '新規登録が完了しました'
    });

  } catch (error) {
    console.error('❌ Authentication Error:', error);
    if (error instanceof Error) {
      return c.json({ 
        error: `認証エラー: ${error.message}`,
        status: 'error'
      }, 500);
    }
    return c.json({ 
      error: '認証エラーが発生しました',
      status: 'error'
    }, 500);
  }
});

export default auth; 