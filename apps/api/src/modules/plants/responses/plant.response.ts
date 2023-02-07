import { Error } from '@modules/common/models/error.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Plant } from '../models/plant.model';

@ObjectType()
export class PlantResponse {
  @Field(() => Plant, { nullable: true })
  plant?: Plant;

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
