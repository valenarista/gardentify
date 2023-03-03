import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => String)
  time: string;

  @Field(() => Int)
  weathercode: number;

  @Field(() => Float)
  temperature_2m_max: number;

  @Field(() => Float)
  temperature_2m_min: number;

  @Field(() => Float)
  uv_index_max: number;

  @Field(() => Float)
  precipitation_sum: number;

  @Field(() => Float)
  windspeed_10m_max: number;

  @Field(() => Float)
  winddirection_10m_dominant: number;
}
