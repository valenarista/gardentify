import { IConfig } from '@modules/config/config.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherForecastResponse } from './responses/weather-forecast.response';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async getWeatherForecast(
    input: WeatherForecastInput,
  ): Promise<WeatherForecastResponse> {
    try {
    } catch (err) {}
  }
}
