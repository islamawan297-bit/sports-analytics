import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { SportsModule } from './sports/sports.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { GamesModule } from './games/games.module';
import { FightsModule } from './fights/fights.module';
import { StandingsModule } from './standings/standings.module';
import { ProvidersModule } from './providers/providers.module';
import { AnalysisModule } from './analysis/analysis.module';
import { AdminModule } from './admin/admin.module';
import { PrismaService } from './prisma/prisma.service';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SportsModule,
    TeamsModule,
    PlayersModule,
    GamesModule,
    FightsModule,
    StandingsModule,
    ProvidersModule,
    AnalysisModule,
    AdminModule,
  ],
  providers: [PrismaService, CacheService],
})
export class AppModule {}
