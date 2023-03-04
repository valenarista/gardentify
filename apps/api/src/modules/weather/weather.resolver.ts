import { Args, Query, Resolver } from '@nestjs/graphql';
import { WeatherForecastInput } from './dto/get-weather-forecast.input';
import { Weather } from './models/weather.model';
import { WeatherForecastResponse } from './responses/weather-forecast.response';
import { WeatherService } from './weather.service';

@Resolver(() => Weather)
export class WeatherResolver {
  constructor(private weatherService: WeatherService) {}

  @Query(() => WeatherForecastResponse)
  async getWeatherForecast(
    @Args('input') input: WeatherForecastInput,
  ): Promise<WeatherForecastResponse> {
    return await this.weatherService.getWeatherForecast(input);
  }
}
