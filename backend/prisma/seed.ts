import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 既存のユーザーを削除
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      user_id: '02801386-60ca-4355-97a7-7285403d56f1',
      user_name: 'test1',
      password: 'password123',
      marking_point_x: 0,
      marking_point_y: 0,
      random_parts_num: 10
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect()); 