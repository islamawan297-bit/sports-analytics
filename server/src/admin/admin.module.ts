import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CacheService } from '../cache/cache.service';
import { ProvidersModule } from '../providers/providers.module';

@Module({
  imports: [ProvidersModule],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, CacheService],
})
export class AdminModule {}
