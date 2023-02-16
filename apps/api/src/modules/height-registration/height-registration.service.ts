import { Args, Mutation } from '@nestjs/graphql';

import { HeightRegistrationResponse } from './response/height-registration.response';
import { FindHeightRegistrationInput } from './dto/find-height-registrations.input';
import { CreateHeightRegistrationInput } from './dto/create-height-registration.input';
import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { HeightRegistrationsResponse } from './response/height-registrations.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class HeightRegistrationsService {
  constructor(private prismaService: PrismaService) {}

  async findHeightRegistration(
    input: FindHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    const heightRegistration =
      await this.prismaService.heightRegistration.findUnique({
        where: {
          uuid: input.uuid,
        },
      });

    if (!heightRegistration) {
      throw new NotFoundException(
        'No height registration found with the given input!',
      );
    }

    return { heightRegistration };
  }

  async createHeightRegistration(
    input: CreateHeightRegistrationInput,
  ): Promise<HeightRegistrationResponse> {
    const heightRegistration =
      await this.prismaService.heightRegistration.create({
        data: {
          height: input.height,
          plant: { connect: { uuid: input.plantUuid } },
        },
      });

    if (!heightRegistration) {
      throw new BadRequestException(
        'Could not create height registration with the given input!',
      );
    }
    return { heightRegistration };
  }

  async findPlantHeightRegistrations(
    input: FindPlantInput,
  ): Promise<HeightRegistrationsResponse> {
    const heightRegistrations =
      await this.prismaService.heightRegistration.findMany({
        where: { plantUuid: input.uuid },
      });

    if (!heightRegistrations.length) {
      throw new NotFoundException(
        'No height registrations found with the given input!',
      );
    }
    return { heightRegistrations };
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteHeightRegistration(
    @Args('find') find: FindHeightRegistrationInput,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.heightRegistration.delete({
        where: { uuid: find.uuid },
      });
      return { deleted: true };
    } catch (err) {
      return {
        errors: [
          {
            field: 'input',
            message: 'An error ocurred!',
          },
        ],
      };
    }
  }
}
