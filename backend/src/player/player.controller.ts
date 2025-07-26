import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlayerService } from './player.service';
import { Player } from 'generated/prisma';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('player')
  getAllPlayers() {
    console.log('get all players controller');
    return this.playerService.getAllPlayers() as Promise<any[]>;
  }

  @Post('player')
  createPlayer(
    @Body() body: { name: string; age: number; teamId: number },
  ): Promise<Player> {
    console.log('player created controller');
    return this.playerService.createPlayer(body);
  }
}
