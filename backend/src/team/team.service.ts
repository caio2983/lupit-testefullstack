import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Team, Prisma } from 'generated/prisma';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async getAllTeams(): Promise<Team[]> {
    return await this.prisma.team.findMany();
  }

  async getTeamById(id: number): Promise<Team | null> {
    return await this.prisma.team.findUnique({
      where: { id },
    });
  }

  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    console.log('team created service');
    return await this.prisma.team.create({
      data,
    });
  }

  async deleteTeam(id: number): Promise<void> {
    id = Number(id);
    await this.prisma.team.delete({
      where: { id },
    });
  }

  async updateTeam(
    id: number,
    updateData: { name?: string; image?: string },
  ): Promise<Team> {
    return this.prisma.team.update({
      where: { id },
      data: {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.image && { image: updateData.image }),
      },
    });
  }
}
