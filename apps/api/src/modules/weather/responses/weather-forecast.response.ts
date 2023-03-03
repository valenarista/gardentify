import { Field, ObjectType } from '@nestjs/graphql';
import { Weather } from '../models/weather.model';

@ObjectType()
export class WeatherForecastResponse {
  @Field(() => [Weather], { nullable: true })
  forecast?: Weather[];
}
