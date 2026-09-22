import { Injectable, Logger } from '@nestjs/common';
import { ISportsProvider, LiveScoreItem, HeadToHeadStats, InjuryReport } from './sports-provider.interface';
import { EspnPublicProvider } from './drivers/espn-public.provider';
import { MockEnrichedProvider } from './drivers/mock-enriched.provider';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class SportsProviderService {
  private readonly logger = new Logger(SportsProviderService.name);
  private providers: ISportsProvider[];

  constructor(
    private espnProvider: EspnPublicProvider,
    private mockProvider: MockEnrichedProvider,
    private cache: CacheService,
  ) {
    this.providers = [this.espnProvider, this.mockProvider];
  }

  async getLiveScores(sportId?: string): Promise<LiveScoreItem[]> {
    const cacheKey = `provider_live_scores_${sportId || 'all'}`;
    const cached = await this.cache.get<LiveScoreItem[]>(cacheKey);
    if (cached) return cached;

    let scores: LiveScoreItem[] = [];
    try {
      scores = await this.espnProvider.getLiveScores(sportId);
    } catch (err: any) {
      this.logger.warn(`Primary provider failed, using fallback driver: ${err.message}`);
    }

    if (!scores || scores.length === 0) {
      scores = await this.mockProvider.getLiveScores(sportId);
    }

    await this.cache.set(cacheKey, scores, 15); // 15s cache TTL for live scores
    return scores;
  }

  async getHeadToHead(team1Id: string, team2Id: string): Promise<HeadToHeadStats> {
    const cacheKey = `provider_h2h_${team1Id}_${team2Id}`;
    const cached = await this.cache.get<HeadToHeadStats>(cacheKey);
    if (cached) return cached;

    const res = await this.espnProvider.getHeadToHead(team1Id, team2Id);
    await this.cache.set(cacheKey, res, 600); // 10 min TTL
    return res;
  }

  async getInjuries(sportId?: string): Promise<InjuryReport[]> {
    const cacheKey = `provider_injuries_${sportId || 'all'}`;
    const cached = await this.cache.get<InjuryReport[]>(cacheKey);
    if (cached) return cached;

    const res = await this.espnProvider.getInjuries(sportId);
    await this.cache.set(cacheKey, res, 300); // 5 min TTL
    return res;
  }

  async getHistoricalStats(sportId: string): Promise<any> {
    const cacheKey = `provider_history_${sportId}`;
    const cached = await this.cache.get<any>(cacheKey);
    if (cached) return cached;

    const res = await this.espnProvider.getHistoricalStats(sportId);
    await this.cache.set(cacheKey, res, 3600); // 1 hour TTL
    return res;
  }
}
