import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "hono/cookie";

const parts = new Hono();
const prisma = new PrismaClient();

// パーツコレクション情報を取得するエンドポイント
parts.get("/collection", async (c) => {
  try {
    const userId = getCookie(c, "userId");
    console.log('Requesting user:', userId);
    
    if (!userId) {
      console.log('No userId found in cookie');
      return c.json([]);
    }

    // 全パーツを取得
    const allParts = await prisma.part.findMany({
      include: {
        material: true,
      },
      orderBy: [
        { materialId: 'asc' },
        { id: 'asc' },
      ],
    });
    console.log('Found parts:', allParts);

    // ユーザーが所持しているパーツを取得
    const userParts = await prisma.userPart.findMany({
      where: {
        userId: userId,
      },
    });
    console.log('User owned parts:', userParts);

    const ownedPartIds = new Set(userParts.map(up => up.partId));
    const partsWithOwnership = allParts.map(part => ({
      id: part.id,
      shape: JSON.parse(part.shape),
      material: part.material.name,
      rarity: part.rarity,
      points: part.points,
      imageUrl: part.imageUrl,
      isOwned: ownedPartIds.has(part.id),
    }));

    console.log('Sending response:', partsWithOwnership);
    return c.json(partsWithOwnership);
  } catch (error) {
    console.error("Error fetching parts collection:", error);
    return c.json([]);
  }
});

export default parts; 