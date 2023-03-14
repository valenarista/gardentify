import { UploadScalar } from '@modules/graphql/graphql';
import { Field, Float, InputType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload-minimal';
import { ContainerType } from '../models/container.model';

@InputType()
export class CreateContainerInput {
  @Field(() => String, {
    description: 'Owner of the container',
  })
  userUuid: string;

  @Field(() => ContainerType, {
    description: 'Type of the container',
  })
  type: ContainerType;

  @Field(() => Float, {
    description: 'Dirth depth of the container',
  })
  dirtDepth: number;

  @Field(() => UploadScalar, { nullable: true })
  thumbnail?: Promise<FileUpload>;
}
