import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService, PrismaService, CacheService],
  exports: [GamesService],
})
export class GamesModule {}
