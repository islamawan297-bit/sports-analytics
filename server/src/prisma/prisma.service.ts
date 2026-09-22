import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully via Prisma Client.');
    } catch (err: any) {
      this.logger.warn(`Prisma connection initialized with warning: ${err.message}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
