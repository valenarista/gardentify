import { Field, ObjectType } from '@nestjs/graphql';
import { Weather } from '../models/weather.model';

@ObjectType()
export class WeatherForecastResponse {
  @Field(() => [Weather])
  forecast: Weather[];
}
