import { Module } from '@nestjs/common';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StandingsController],
  providers: [StandingsService, PrismaService],
  exports: [StandingsService],
})
export class StandingsModule {}
