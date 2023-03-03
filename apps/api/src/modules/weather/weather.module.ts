import { PrismaService } from '@modules/prisma/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  providers: [PrismaService, WeatherResolver, WeatherService],
})
export class WeatherModule {}
