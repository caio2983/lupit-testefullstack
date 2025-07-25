import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamService } from './team/team.service';
import { TeamController } from './team/team.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, TeamController],
  providers: [AppService, TeamService, PrismaService],
})
export class AppModule {}
