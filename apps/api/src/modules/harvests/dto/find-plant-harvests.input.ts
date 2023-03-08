import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindPlantHarvestsInput {
  @Field(() => FindPlantInput, { nullable: true })
  where?: FindPlantInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
