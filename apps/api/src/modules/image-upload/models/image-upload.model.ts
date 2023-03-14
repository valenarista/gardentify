import { BaseModel } from '@modules/common/models/base.model';
import { Container } from '@modules/container/models/container.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ImageUpload extends BaseModel {
  @Field(() => String)
  fileName: string;

  @Field(() => String)
  fileType: string;

  @Field(() => [Container], { nullable: true })
  containers?: Container[];
}
