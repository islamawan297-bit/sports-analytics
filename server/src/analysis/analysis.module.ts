import { Module } from '@nestjs/common';
import { AnalysisEngine } from './analysis.engine';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { ProvidersModule } from '../providers/providers.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ProvidersModule],
  controllers: [AnalysisController],
  providers: [AnalysisEngine, AnalysisService, PrismaService],
  exports: [AnalysisService, AnalysisEngine],
})
export class AnalysisModule {}
