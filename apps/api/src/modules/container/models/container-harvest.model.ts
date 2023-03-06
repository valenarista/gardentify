import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContainerHarvest {
  @Field(() => Date)
  date: Date;

  @Field(() => Float)
  weight: number;
}
