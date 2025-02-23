/*
  Warnings:

  - You are about to drop the column `createdAt` on the `fortresses` table. All the data in the column will be lost.
  - You are about to drop the column `gridData` on the `fortresses` table. All the data in the column will be lost.
  - Added the required column `grid_data` to the `fortresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fortresses` DROP COLUMN `createdAt`,
    DROP COLUMN `gridData`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `grid_data` VARCHAR(191) NOT NULL;
