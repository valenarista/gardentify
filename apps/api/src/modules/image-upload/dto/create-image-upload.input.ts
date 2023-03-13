import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageUploadInput {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileType: string;
}
