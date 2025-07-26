import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamService } from './team/team.service';
import { Player, Team } from 'generated/prisma';
import { PlayerService } from './player/player.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly teamService: TeamService,
    private readonly playerService: PlayerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('team')
  async createTeam(@Body() teamData: { name: string }): Promise<Team> {
    const team = await this.teamService.createTeam(teamData);
    console.log('team created', team);
    return team;
  }

  @Get('team')
  async getAllTeams(): Promise<Team[]> {
    console.log('get all teams app controller');
    return this.teamService.getAllTeams();
  }

  @Post('player')
  async createPlayer(
    @Body() playerData: { name: string; age: number; teamId: number },
  ): Promise<Player> {
    const player = await this.playerService.createPlayer(playerData);
    console.log('player created', player);
    return player;
  }

  @Get('player')
  async getAllPlayers(): Promise<Player[]> {
    console.log('get all players app controller');
    return this.playerService.getAllPlayers();
  }
}
