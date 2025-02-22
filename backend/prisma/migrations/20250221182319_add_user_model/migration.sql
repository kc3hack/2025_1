/*
  Warnings:

  - You are about to drop the column `userID` on the `Fortress` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userID` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `UserPart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Fortress` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserPart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Fortress` DROP FOREIGN KEY `Fortress_userID_fkey`;

-- DropForeignKey
ALTER TABLE `UserPart` DROP FOREIGN KEY `UserPart_userID_fkey`;

-- DropIndex
DROP INDEX `Fortress_userID_fkey` ON `Fortress`;

-- DropIndex
DROP INDEX `UserPart_userID_fkey` ON `UserPart`;

-- AlterTable
ALTER TABLE `Fortress` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `userID`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UserPart` DROP COLUMN `userID`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_user_name_key` ON `User`(`user_name`);

-- AddForeignKey
ALTER TABLE `UserPart` ADD CONSTRAINT `UserPart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fortress` ADD CONSTRAINT `Fortress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
