import { Field, InputType } from '@nestjs/graphql';
import { PlantType } from '../models/plant.model';
import { FindPlantInput } from './find-plant.input';

@InputType()
class UpdatePlantInputData {
  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;
}

@InputType()
export class UpdatePlantInput {
  @Field(() => FindPlantInput)
  find: FindPlantInput;

  @Field(() => UpdatePlantInputData)
  data: UpdatePlantInputData;
}
