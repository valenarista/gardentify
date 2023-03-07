import { Field, InputType, Int } from '@nestjs/graphql';
import { FindContainerInput } from './find-container.input';

@InputType()
export class FindContainerPlantsInput {
  @Field(() => FindContainerInput)
  where: FindContainerInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => String, { nullable: true })
  cursor?: string;
}
