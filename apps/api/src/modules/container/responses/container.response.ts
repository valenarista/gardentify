import { Field, ObjectType } from '@nestjs/graphql';
import { Container } from '../models/container.model';

@ObjectType()
export class ContainerResponse {
  @Field(() => Container, { nullable: true })
  container?: Container;
}
