/*
  Warnings:

  - You are about to drop the column `grid_data` on the `fortresses` table. All the data in the column will be lost.
  - You are about to drop the column `materials` on the `fortresses` table. All the data in the column will be lost.
  - Added the required column `parts` to the `fortresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fortresses` DROP COLUMN `grid_data`,
    DROP COLUMN `materials`,
    ADD COLUMN `parts` JSON NOT NULL;
