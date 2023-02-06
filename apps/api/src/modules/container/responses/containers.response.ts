import { Error } from '@modules/common/models/error.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Container } from '../models/container.model';

@ObjectType()
export class ContainersResponse {
  @Field(() => [Container], { nullable: true })
  containers?: Container[];

  @Field(() => [Error], { nullable: true })
  errors?: Error[];
}
