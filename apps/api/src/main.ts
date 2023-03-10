import 'class-validator';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

import { __PROD__ } from '@modules/common/lib/constants';
import { PrismaService } from '@modules/prisma/prisma.service';
import cookieParser from 'cookie-parser';

const bootstrap = async () => {
  /*==================Initialization================*/
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*================== VALIDATION ==================*/
  app.useGlobalPipes(new ValidationPipe());

  /*================== PRISMA ==================*/
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /*========= PREFIX =========*/
  app.setGlobalPrefix('api');

  app.set('trust proxy', 1);

  /*========= VERSIONING =========*/
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(cookieParser());

  app.useBodyParser('json', { limit: '50mb' });

  app.enableCors({
    origin: __PROD__ ? process.env.CLIENT_URL_DEPLOY : process.env.CLIENT_URL,
    credentials: true,
  });

  /*========= START =========*/
  await app.listen(process.env.PORT || 4000);
};
bootstrap();
