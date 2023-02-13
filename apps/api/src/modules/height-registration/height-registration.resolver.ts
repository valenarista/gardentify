import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { HeightRegistration } from './models/height-registration.model';
import { HeightRegistrationResponse } from './response/height-registration.response';
import { FindHeightRegistrationInput } from './dto/find-height-registrations.input';
import { CreateHeightRegistrationInput } from './dto/create-height-registration.input';
import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { HeightRegistrationsResponse } from './response/height-registrations.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { HeightRegistrationsService } from './height-registration.service';

@Resolver(() => HeightRegistration)
export class HeightRegistrationsResolver {
  constructor(private heightRegistrationService: HeightRegistrationsService) {}

  @Query(() => HeightRegistrationResponse)
  async findHeightRegistration(
    @Args('input') input: FindHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    return await this.heightRegistrationService.findHeightRegistration(input);
  }

  @Mutation(() => HeightRegistrationResponse)
  async createHeightRegistration(
    @Args('input') input: CreateHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    return await this.heightRegistrationService.createHeightRegistration(input);
  }

  @Query(() => HeightRegistrationsResponse)
  async findPlantHeightRegistrations(
    @Args('input') input: FindPlantInput,
  ): Promise<HeightRegistrationsResponse> {
    return await this.heightRegistrationService.findPlantHeightRegistrations(
      input,
    );
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteHeightRegistration(
    @Args('input') input: FindHeightRegistrationInput,
  ): Promise<DeleteObjectResponse> {
    return await this.heightRegistrationService.deleteHeightRegistration(input);
  }
}
