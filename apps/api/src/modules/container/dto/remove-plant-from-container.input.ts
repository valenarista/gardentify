import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePlantFromContainerInput {
  @Field(() => String)
  containerUuid: string;

  @Field(() => String)
  plantUuid: string;
}
