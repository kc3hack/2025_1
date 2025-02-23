/*
  Warnings:

  - You are about to drop the column `domination` on the `user_parts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,part_id]` on the table `user_parts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `parts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parts` ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `points` INTEGER NOT NULL,
    ADD COLUMN `rarity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user_parts` DROP COLUMN `domination`;

-- CreateIndex
CREATE UNIQUE INDEX `user_parts_user_id_part_id_key` ON `user_parts`(`user_id`, `part_id`);
