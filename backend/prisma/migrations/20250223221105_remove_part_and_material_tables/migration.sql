/*
  Warnings:

  - You are about to drop the `materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `parts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_parts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `parts` DROP FOREIGN KEY `parts_material_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_parts` DROP FOREIGN KEY `user_parts_part_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_parts` DROP FOREIGN KEY `user_parts_user_id_fkey`;

-- DropTable
DROP TABLE `materials`;

-- DropTable
DROP TABLE `parts`;

-- DropTable
DROP TABLE `user_parts`;
