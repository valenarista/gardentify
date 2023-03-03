import { IConfig } from '@modules/config/config.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, map, lastValueFrom } from 'rxjs';
import { WeatherForecastInput } from './dto/get-weather-forecast.input';
import { WeatherForecastApiResponse } from './lib/weather-lib';
import { Weather } from './models/weather.model';
import { WeatherForecastResponse } from './responses/weather-forecast.response';

@Injectable()
export class WeatherService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<IConfig>,
  ) {}

  async getWeatherForecast(
    input: WeatherForecastInput,
  ): Promise<WeatherForecastResponse> {
    try {
      const forecastDays = 7;
      const baseApi = this.configService.get('weather', {
        infer: true,
      }).api;

      const dailyParams =
        'weathercode,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant';

      const params = {
        latitude: String(input.latitude),
        longitude: String(input.longitude),
        models: 'best_match',
      };

      const searchParams = new URLSearchParams(params).toString();

      const completeUrl = `${baseApi}?${searchParams}&daily=${dailyParams}&timezone=America%2FSao_Paulo`;

      console.log({ completeUrl });

      const request = this.httpService
        .get<WeatherForecastApiResponse>(completeUrl)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new ForbiddenException('API not available');
          }),
        );

      const forecast = await lastValueFrom(request);
      const dataEntries = Object.entries(forecast.daily);

      const weatherForecast: Weather[] = [];

      for (let i = 0; i < forecastDays; i++) {
        const forecastEntry: Weather = {
          precipitation_sum: 0,
          temperature_2m_max: 0,
          temperature_2m_min: 0,
          time: '0',
          uv_index_max: 0,
          weathercode: 0,
          winddirection_10m_dominant: 0,
          windspeed_10m_max: 0,
        };
        dataEntries.forEach((entry) => {
          const [key, data] = entry;
          forecastEntry[key] = data[i];
        });
        weatherForecast.push(forecastEntry);
      }

      return { forecast: weatherForecast };
    } catch (err) {}
  }
}
