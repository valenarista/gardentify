import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '@modules/common/models/base.model';
import { Plant } from '@modules/plants/models/plant.model';

@ObjectType()
export class HeightRegistration extends BaseModel {
  @Field(() => Float, { nullable: true })
  height?: number;

  @Field(() => Plant, { nullable: true })
  plant?: Plant;
}
