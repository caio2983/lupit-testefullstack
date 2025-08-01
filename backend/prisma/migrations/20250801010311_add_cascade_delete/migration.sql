-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_team_id_fkey";

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
