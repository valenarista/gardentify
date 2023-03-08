import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindBestPerformingContainersInput {
  @Field(() => String)
  userUuid: string;

  @Field(() => Int)
  take: number;
}
