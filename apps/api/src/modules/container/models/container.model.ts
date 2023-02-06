import { BaseModel } from '@modules/common/models/base.model';
import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';

enum ContainerType {
  Plot,
  Bag,
}

registerEnumType(ContainerType, {
  name: 'ContainerType',
  description: 'The type of a conatiner',
});

@ObjectType({ isAbstract: true })
export class Container extends BaseModel {
  @Field(() => ContainerType, {
    nullable: true,
    description: 'Type of the container',
  })
  type?: ContainerType;

  @Field(() => Float, {
    nullable: true,
    description: 'Dirth depth of the container',
  })
  dirtDepth?: number;
}
