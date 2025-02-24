/*
  Warnings:

  - You are about to drop the column `chubu_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `chugoku_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `kansai_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `kanto_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `kyushu_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `shikoku_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `tohoku_domination` on the `user_parts` table. All the data in the column will be lost.
  - You are about to drop the column `total_domination` on the `user_parts` table. All the data in the column will be lost.
  - Added the required column `domination` to the `user_parts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_parts` DROP COLUMN `chubu_domination`,
    DROP COLUMN `chugoku_domination`,
    DROP COLUMN `kansai_domination`,
    DROP COLUMN `kanto_domination`,
    DROP COLUMN `kyushu_domination`,
    DROP COLUMN `shikoku_domination`,
    DROP COLUMN `tohoku_domination`,
    DROP COLUMN `total_domination`,
    ADD COLUMN `domination` DOUBLE NOT NULL;
