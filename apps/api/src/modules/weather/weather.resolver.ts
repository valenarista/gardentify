import { Resolver } from '@nestjs/graphql';
import { Weather } from './models/weather.model';
import { WeatherService } from './weather.service';

@Resolver(() => Weather)
export class WeatherResolver {
  constructor(private weatherService: WeatherService) {}
}
