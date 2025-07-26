import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Player } from 'generated/prisma';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async getAllPlayers(): Promise<Player[]> {
    return await this.prisma.player.findMany();
  }

  async createPlayer(data: {
    name: string;
    age: number;
    teamId: number;
  }): Promise<Player> {
    console.log('player created service');
    return await this.prisma.player.create({
      data: {
        name: data.name,
        age: data.age,
        team: {
          connect: { id: data.teamId },
        },
      },
    });
  }
}
