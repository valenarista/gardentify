import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Weather {
  @Field(() => Date)
  date: Date;
}
