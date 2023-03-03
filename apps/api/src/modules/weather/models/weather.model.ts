import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => String)
  time: string;

  @Field(() => Int)
  weatherCode: number;

  @Field(() => Float)
  temperatureMax: number;

  @Field(() => Float)
  temperatureMin: number;

  @Field(() => Float)
  uvIndexMax: number;

  @Field(() => Float)
  precipitationSum: number;

  @Field(() => Float)
  windSpeedMax: number;

  @Field(() => Float)
  windDirectionDominant: number;
}
