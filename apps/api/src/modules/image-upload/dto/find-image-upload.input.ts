import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindImageUploadInput {
  @Field(() => String)
  uuid: string;
}
