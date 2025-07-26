/*
  Warnings:

  - You are about to drop the column `team_id` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `team_name` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "team_id",
ADD COLUMN     "team_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "Team"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
