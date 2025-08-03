/*
  Warnings:

  - You are about to drop the column `image` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "image";
