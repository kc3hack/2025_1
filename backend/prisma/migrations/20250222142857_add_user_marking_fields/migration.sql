/*
  Warnings:

  - A unique constraint covering the columns `[user_name,password]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `marking_point_x` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `marking_point_y` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `random_parts_num` INTEGER NOT NULL DEFAULT 10;

-- CreateIndex
CREATE UNIQUE INDEX `users_user_name_password_key` ON `users`(`user_name`, `password`);
