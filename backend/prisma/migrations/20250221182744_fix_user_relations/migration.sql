/*
  Warnings:

  - You are about to drop the column `userId` on the `Fortress` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserPart` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Fortress` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `UserPart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Fortress` DROP FOREIGN KEY `Fortress_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserPart` DROP FOREIGN KEY `UserPart_userId_fkey`;

-- DropIndex
DROP INDEX `Fortress_userId_fkey` ON `Fortress`;

-- DropIndex
DROP INDEX `UserPart_userId_fkey` ON `UserPart`;

-- AlterTable
ALTER TABLE `Fortress` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- AlterTable
ALTER TABLE `UserPart` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `UserPart` ADD CONSTRAINT `UserPart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fortress` ADD CONSTRAINT `Fortress_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
