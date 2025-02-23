/*
  Warnings:

  - You are about to drop the column `boundingBox` on the `fortresses` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `fortresses` table. All the data in the column will be lost.
  - You are about to drop the column `parts` on the `fortresses` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `fortresses` table. All the data in the column will be lost.
  - Added the required column `gridData` to the `fortresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `materials` to the `fortresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fortresses` DROP COLUMN `boundingBox`,
    DROP COLUMN `height`,
    DROP COLUMN `parts`,
    DROP COLUMN `width`,
    ADD COLUMN `gridData` VARCHAR(191) NOT NULL,
    ADD COLUMN `materials` JSON NOT NULL;
