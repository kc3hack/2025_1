/*
  Warnings:

  - The primary key for the `governances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `kansai` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `chubu` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `shikoku` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `kyushu` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `chugoku` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `kanto` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `tohoku` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `total` on the `governances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `governances` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `kansai` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `chubu` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `shikoku` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `kyushu` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `chugoku` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `kanto` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `tohoku` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `total` DOUBLE NOT NULL DEFAULT 0,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    ADD PRIMARY KEY (`id`);
