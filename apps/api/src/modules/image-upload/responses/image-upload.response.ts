import { Field, ObjectType } from '@nestjs/graphql';
import { ImageUpload } from '../models/image-upload.model';

@ObjectType()
export class ImageUploadResponse {
  @Field(() => ImageUpload, { nullable: true })
  imageUpload?: ImageUpload;
}
