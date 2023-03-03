import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { WeatherResolver } from './weather.resolver';
import { WeatherService } from './weather.service';

@Module({
  imports: [],
  providers: [PrismaService, WeatherResolver, WeatherService],
})
export class WeatherModule {}
