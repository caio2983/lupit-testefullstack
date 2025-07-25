import { Controller, Get, Post, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team } from 'generated/prisma';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams() {
    console.log('get all teams controller');
    return this.teamService.getAllTeams() as Promise<any[]>;
  }

  @Post()
  createTeam(@Body() body: { name: string }): Promise<Team> {
    console.log('team created controller');
    return this.teamService.createTeam(body);
  }
}
