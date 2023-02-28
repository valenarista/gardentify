import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateHarvestInput {
  @Field(() => FindPlantInput, { nullable: false })
  plant: FindPlantInput;

  @Field(() => Int, { nullable: true })
  quantity?: number;

  @Field(() => Float)
  weight: number;
}
