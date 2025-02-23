/*
  Warnings:

  - You are about to drop the column `marking_point_x` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `marking_point_y` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `marking_point_x`,
    DROP COLUMN `marking_point_y`;
