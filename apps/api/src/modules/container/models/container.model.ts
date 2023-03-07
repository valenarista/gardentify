import { BaseModel } from '@modules/common/models/base.model';
import { User } from '@modules/users/models/user.model';
import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum ContainerType {
  Plot = 'Plot',
  Bag = 'Bag',
  Patch = 'Patch',
}

registerEnumType(ContainerType, {
  name: 'ContainerType',
  description: 'The type of a conatiner',
});

@ObjectType()
export class Container extends BaseModel {
  @Field(() => ContainerType, {
    description: 'Type of the container',
  })
  type: ContainerType;

  @Field(() => Float, {
    description: 'Dirth depth of the container',
  })
  dirtDepth: number;

  @Field(() => User, { nullable: true })
  user?: User;
}
