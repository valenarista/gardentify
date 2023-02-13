import { BaseModel } from '@modules/common/models/base.model';
import { Container } from '@modules/container/models/container.model';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PlantType {
  NONE = 'NONE',
  TOMATO = 'TOMATO',
  POTATO = 'POTATO',
  CARROT = 'CARROT',
  ONION = 'ONION',
  CUCUMBER = 'CUCUMBER',
  PEPPER = 'PEPPER',
  PEA = 'PEA',
  BROCCOLI = 'BROCCOLI',
  CABBAGE = 'CABBAGE',
  CORN = 'CORN',
  BEAN = 'BEAN',
  BEET = 'BEET',
  CELERY = 'CELERY',
  EGGPLANT = 'EGGPLANT',
  GARLIC = 'GARLIC',
  GINGER = 'GINGER',
  GREEN_BEAN = 'GREEN_BEAN',
  KALE = 'KALE',
  LETTUCE = 'LETTUCE',
  MUSTARD = 'MUSTARD',
  SQUASH = 'SQUASH',
  WATERMELON = 'WATERMELON',
}

// Register plant type from prisma.
registerEnumType(PlantType, {
  name: 'PlantType',
  description: 'Used for declaring the type of plant.',
});

@ObjectType()
export class Plant extends BaseModel {
  @Field(() => PlantType, { nullable: true })
  type?: PlantType;

  @Field(() => String, { nullable: true })
  variety?: string;

  @Field(() => Date, { nullable: true })
  seedsPlantedAt?: Date;

  @Field(() => Date, { nullable: true })
  seedsSproutedAt?: Date;

  @Field(() => Container, { nullable: true })
  container?: Container;
}
