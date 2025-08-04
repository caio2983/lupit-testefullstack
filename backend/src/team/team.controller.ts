import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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

  @Get(':id')
  getTeamById(@Param('id') id: number) {
    console.log(`get team by id controller: ${id}`);
    return this.teamService.getTeamById(id);
  }

  @Post()
  createTeam(
    @Body()
    body: {
      name: string;
      image: string | null;
    },
  ): Promise<Team> {
    console.log('team created controller');
    return this.teamService.createTeam(body);
  }
}
