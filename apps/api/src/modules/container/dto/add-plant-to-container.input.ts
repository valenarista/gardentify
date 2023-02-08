import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddPlantToContainerInput {
  @Field(() => String)
  containerUuid: string;

  @Field(() => String)
  plantUuid: string;
}
