import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SportsController],
  providers: [SportsService, PrismaService],
  exports: [SportsService],
})
export class SportsModule {}
