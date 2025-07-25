import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team, Prisma } from 'generated/prisma';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAllTeams(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    console.log('team created service');
    return await this.prisma.team.create({
      data,
    });
  }
}
