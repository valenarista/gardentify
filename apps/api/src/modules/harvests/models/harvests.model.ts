import { BaseModel } from '@modules/common/models/base.model';
import { Plant } from '@modules/plants/models/plant.model';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Harvest extends BaseModel {
  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float)
  weight: number;

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
