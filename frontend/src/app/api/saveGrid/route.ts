// import { NextResponse } from 'next/server';
// import { GridBoundary } from '@/app/types/GridBoundary';
// import prisma from '@/lib/prisma';

// export async function POST(request: Request) {
//     try {
//         const boundary: GridBoundary = await request.json();

//         const savedGrid = await prisma.grid.create({
//             data: {
//                 top: boundary.top,
//                 left: boundary.left,
//                 bottom: boundary.bottom,
//                 right: boundary.right,
//                 gridData: JSON.stringify(boundary.grid),
//                 // ユーザーIDなども必要に応じて追加
//             }
//         });

//         return NextResponse.json({ id: savedGrid.id });
//     } catch (error) {
//         console.error('Failed to save grid:', error);
//         return NextResponse.json(
//             { error: 'Failed to save grid' },
//             { status: 500 }
//         );
//     }
// } 