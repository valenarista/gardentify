import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class WeatherForecastInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}
