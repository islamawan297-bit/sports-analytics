import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [ProvidersModule],
  controllers: [FightsController],
  providers: [FightsService, PrismaService],
  exports: [FightsService],
})
export class FightsModule {}
