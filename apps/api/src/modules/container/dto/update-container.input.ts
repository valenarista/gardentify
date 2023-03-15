import { UploadScalar } from '@modules/graphql/graphql';
import { Field, Float, InputType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload-minimal';
import { ContainerType } from '../models/container.model';

@InputType()
export class UpdateContainerInput {
  @Field(() => String)
  uuid: string;

  @Field(() => ContainerType, {
    description: 'Type of the container',
    nullable: true,
  })
  type?: ContainerType;

  @Field(() => Float, {
    description: 'Dirth depth of the container',
    nullable: true,
  })
  dirtDepth?: number;

  @Field(() => UploadScalar, { nullable: true })
  thumbnail?: Promise<FileUpload>;
}
