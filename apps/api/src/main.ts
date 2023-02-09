import 'class-validator';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';

const bootstrap = async () => {
  /*==================Initialization================*/
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*================== VALIDATION ==================*/
  app.useGlobalPipes(new ValidationPipe());

  /*================== PRISMA ==================*/
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  /*========= PREFIX =========*/
  app.setGlobalPrefix('api');

  app.set('trust proxy', 1);

  /*========= VERSIONING =========*/
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  /*========= START =========*/
  await app.listen(process.env.PORT || 4000);
};
bootstrap();
