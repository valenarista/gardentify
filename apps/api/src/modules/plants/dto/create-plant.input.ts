import { FindContainerInput } from '@modules/container/dto/find-container.input';
import { Field, InputType } from '@nestjs/graphql';

import { PlantType } from '../models/plant.model';

@InputType()
export class CreatePlantInput {
  @Field(() => FindContainerInput, { nullable: false })
  container: FindContainerInput;

  @Field(() => String, { nullable: false })
  variety: string;

  @Field(() => PlantType, { nullable: false })
  type: PlantType;

  @Field(() => Date, { nullable: true })
  plantedSeedsOn?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedOn?: Date;
}
