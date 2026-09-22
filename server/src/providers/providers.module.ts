import { Module } from '@nestjs/common';
import { EspnPublicProvider } from './drivers/espn-public.provider';
import { MockEnrichedProvider } from './drivers/mock-enriched.provider';
import { SportsProviderService } from './sports-provider.service';
import { CacheService } from '../cache/cache.service';

@Module({
  providers: [EspnPublicProvider, MockEnrichedProvider, SportsProviderService, CacheService],
  exports: [SportsProviderService],
})
export class ProvidersModule {}
