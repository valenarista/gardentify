import { BaseModel } from '@modules/common/models/base.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ImageUpload extends BaseModel {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileType: string;
}
