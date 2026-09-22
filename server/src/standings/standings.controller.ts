import { Controller, Get, Param } from '@nestjs/common';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService) {}

  @Get(':sport')
  async getStandings(@Param('sport') sport: string) {
    return this.standingsService.getStandingsBySport(sport);
  }
}
