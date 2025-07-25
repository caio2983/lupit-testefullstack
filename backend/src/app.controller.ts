import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TeamService } from './team/team.service';
import { Team } from 'generated/prisma';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly teamService: TeamService,
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
}
