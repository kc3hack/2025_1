/*
  Warnings:

  - Added the required column `boundingBox` to the `fortresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `fortresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parts` to the `fortresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `fortresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `fortresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fortresses` ADD COLUMN `boundingBox` JSON NOT NULL,
    ADD COLUMN `height` INTEGER NOT NULL,
    ADD COLUMN `parts` JSON NOT NULL,
    ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `width` INTEGER NOT NULL;
