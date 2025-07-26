import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamService } from './team/team.service';
import { TeamController } from './team/team.controller';
import { PrismaService } from './prisma/prisma.service';
import { PlayerController } from './player/player.controller';
import { PlayerService } from './player/player.service';

@Module({
  imports: [],
  controllers: [AppController, TeamController, PlayerController],
  providers: [AppService, TeamService, PlayerService, PrismaService],
})
export class AppModule {}
