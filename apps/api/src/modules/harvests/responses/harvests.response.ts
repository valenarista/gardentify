import { Error } from '@modules/common/models/error.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Harvest } from '../models/harvests.model';

@ObjectType()
export class HarvestsResponse {
  @Field(() => [Harvest], { nullable: true })
  harvests?: Harvest[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
