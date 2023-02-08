import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from '../models/plant.model';

@InputType()
export class UpdatePlantInput {
  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;
}
