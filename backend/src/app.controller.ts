import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('team/:id')
  async getTeamById(@Param('id') id: string): Promise<Team | null> {
    console.log('get team by id app controller', id);
    return this.teamService.getTeamById(Number(id));
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

  @Get('player/:id')
  async getPlayerById(@Param('id') id: string): Promise<Player | null> {
    console.log('get player by id app controller', id);
    return this.playerService.getPlayerById(Number(id));
  }

  @Get('player/delete/:id')
  async deletePlayer(@Param('id') id: number): Promise<{ message: string }> {
    await this.playerService.deletePlayer(id);
    return { message: `player with id ${id} deleted` };
  }

  @Get('team/delete/:id')
  async deleteTeam(@Param('id') id: number): Promise<{ message: string }> {
    await this.teamService.deleteTeam(id);
    return { message: `team with id ${id} deleted` };
  }
}
