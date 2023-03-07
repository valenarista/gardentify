import { Field, InputType, Int } from '@nestjs/graphql';
import { FindPlantInput } from './find-plant.input';

@InputType()
export class FindPlantsInput {
  @Field(() => FindPlantInput, { nullable: true })
  where?: FindPlantInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
