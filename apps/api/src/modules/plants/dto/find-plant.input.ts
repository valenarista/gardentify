import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPlantInput {
  @Field(() => String)
  uuid: string;
}
