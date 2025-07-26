/*
  Warnings:

  - You are about to drop the column `team_name` on the `Player` table. All the data in the column will be lost.
  - Added the required column `team_id` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_name_fkey";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "team_name",
ADD COLUMN     "team_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
