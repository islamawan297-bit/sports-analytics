import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AllExceptionsFilter } from '../src/common/filters/http-exception.filter';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const expressApp = express();
let isInitialized = false;

async function bootstrapServer() {
  if (!isInitialized) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.setGlobalPrefix('api');
    app.enableCors({ origin: '*', credentials: true });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());

    await app.init();
    isInitialized = true;
  }
  return expressApp;
}

export default async function handler(req: any, res: any) {
  const server = await bootstrapServer();
  server(req, res);
}
