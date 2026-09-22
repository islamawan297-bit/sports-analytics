import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Get('game/:id')
  async getGameAnalysis(@Param('id') gameId: string) {
    return this.analysisService.getGameAnalysis(gameId);
  }

  @Get('h2h')
  async getHeadToHead(
    @Query('team1') team1Id: string,
    @Query('team2') team2Id: string,
  ) {
    return this.analysisService.getHeadToHead(team1Id || 'lakers', team2Id || 'celtics');
  }

  @Get('injuries')
  async getInjuries(@Query('sport') sportId?: string) {
    return this.analysisService.getInjuries(sportId);
  }

  @Get('history/:sport')
  async getHistoricalStats(@Param('sport') sportId: string) {
    return this.analysisService.getHistoricalStats(sportId);
  }
}
