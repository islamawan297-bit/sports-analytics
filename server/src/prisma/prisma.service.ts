import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl && !dbUrl.includes('localhost')) {
      try {
        await this.$connect();
        this.logger.log('Database connected successfully via Prisma Client.');
      } catch (err: any) {
        this.logger.warn(`Prisma connection initialized with warning: ${err.message}`);
      }
    } else {
      this.logger.log('Prisma running in provider/in-memory mode (Localhost DB URL or unconfigured in serverless environment).');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (e) {}
  }
}
