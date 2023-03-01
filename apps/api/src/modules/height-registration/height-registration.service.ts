import { Args, Mutation } from '@nestjs/graphql';

import { HeightRegistrationResponse } from './response/height-registration.response';
import { FindHeightRegistrationInput } from './dto/find-height-registration.input';
import { CreateHeightRegistrationInput } from './dto/create-height-registration.input';
import { FindPlantInput } from '@modules/plants/dto/find-plant.input';
import { HeightRegistrationsResponse } from './response/height-registrations.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { PrismaService } from '@modules/prisma/prisma.service';
import { FindHeightRegistrationsInput } from './dto/find-height-registrations.input';
import { HeightRegistration } from './models/height-registration.model';
import { parsePlantType } from '@modules/plants/lib/plant-utils';
import { Plant } from '@modules/plants/models/plant.model';

@Injectable()
export class HeightRegistrationsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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

  async findHeightRegistrations(
    input: FindHeightRegistrationsInput,
  ): Promise<HeightRegistrationsResponse> {
    try {
      const heightRegistrations =
        await this.prismaService.heightRegistration.findMany({
          take: input.take,
          include: { plant: input.includePlant },
        });

      if (!heightRegistrations.length) {
        throw new NotFoundException(
          'Could not find height registrations with the given input!',
        );
      }

      const mappedHeightRegistrations: HeightRegistration[] =
        heightRegistrations.map((heightRegistration) => {
          const parsedPlant: Plant = {
            ...heightRegistration.plant,
            type: parsePlantType(heightRegistration.plant.type),
          };

          return {
            ...heightRegistration,
            plant: parsedPlant,
          };
        });

      return { heightRegistrations: mappedHeightRegistrations };
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
