import { Args } from '@nestjs/graphql';
import { CreateContainerInput } from './dto/create-container.input';
import { FindContainerInput } from './dto/find-container.input';
import { Container, ContainerType } from './models/container.model';
import { ContainerResponse } from './responses/container.response';
import { ContainersResponse } from './responses/containers.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { AddPlantToContainerInput } from './dto/add-plant-to-container.input';
import { parseContainerType } from './lib/container-utils';
import { RemovePlantFromContainerInput } from './dto/remove-plant-from-container.input';
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindUserContainersInput } from './dto/find-user-containers.input';
import { UpdateContainerInput } from './dto/update-container.input';
import { PlantsResponse } from '@modules/plants/responses/plants.response';
import { Plant } from '@modules/plants/models/plant.model';
import { parsePlantType } from '@modules/plants/lib/plant-utils';
import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class ContainersService {
  constructor(private prismaService: PrismaService) {}

  async findContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerResponse> {
    try {
      const container = await this.prismaService.container.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: { user: true },
      });

      if (!container) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Not container found with the given input!',
            },
          ],
        };
      }

      const parsedContainer: Container = {
        ...container,
        type: container.type === 'Bag' ? ContainerType.Bag : ContainerType.Plot,
      };

      return { container: parsedContainer };
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

  async findContainers(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainersResponse> {
    try {
      const containers = await this.prismaService.container.findMany({
        where: { uuid: input.uuid },
      });

      if (!containers.length) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Not container found with the given input!',
            },
          ],
        };
      }

      const parsedContainers: Container[] = containers.map((container) => {
        return {
          ...container,
          type:
            container.type === 'Bag' ? ContainerType.Bag : ContainerType.Plot,
        };
      });

      return { containers: parsedContainers };
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

  async createContainer(
    @Args('input') input: CreateContainerInput,
  ): Promise<ContainerResponse> {
    try {
      const container = await this.prismaService.container.create({
        data: {
          type: parseContainerType(input.type),
          dirtDepth: input.dirtDepth,
          user: { connect: { uuid: input.userUuid } },
        },
      });

      if (!container) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Could not create container with the given input!',
            },
          ],
        };
      }

      const parsedContainer: Container = {
        ...container,
        type: container.type === 'Bag' ? ContainerType.Bag : ContainerType.Plot,
      };

      return { container: parsedContainer };
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

  async deleteContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.container.delete({
        where: { uuid: input.uuid },
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

  async addPlantToContainer(
    @Args('input') input: AddPlantToContainerInput,
  ): Promise<ContainerResponse> {
    try {
      const updatedContainer = await this.prismaService.container.update({
        where: { uuid: input.containerUuid },
        data: {
          plants: { connect: { uuid: input.plantUuid } },
        },
        include: { user: true },
      });
      if (!updatedContainer) {
        return {
          errors: [
            {
              field: 'input',
              message: 'Could not add plant to container with the given input!',
            },
          ],
        };
      }

      const parsedContainer: Container = {
        ...updatedContainer,
        type: parseContainerType(updatedContainer.type),
      };

      return {
        container: parsedContainer,
      };
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

  async removePlantFromContainer(
    @Args('input') input: RemovePlantFromContainerInput,
  ): Promise<DeleteObjectResponse> {
    try {
      // await this.prismaService.container.update({
      //   where: { uuid: input.containerUuid },
      //   data: { plants: { disconnect: { uuid: input.plantUuid } } },
      //   include: { plants: true },
      // });
      await this.prismaService.plant.update({
        where: { uuid: input.plantUuid },
        data: { container: {} },

        include: { container: true },
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

  async updateContainer(
    input: UpdateContainerInput,
  ): Promise<ContainerResponse> {
    const container = await this.prismaService.container.update({
      where: { uuid: input.uuid },
      data: {
        ...input,
      },
      include: { user: true },
    });

    if (!container) {
      throw new NotFoundException('No container found with the given input!');
    }
    const parsedContainer: Container = {
      ...container,
      type: parseContainerType(container.type),
    };

    return {
      container: parsedContainer,
    };
  }

  async findUserContainers(
    input: FindUserContainersInput,
  ): Promise<ContainersResponse> {
    const containers = await this.prismaService.container.findMany({
      where: {
        userUuid: input.userUuid,
      },
    });

    if (!containers.length) {
      throw new NotFoundException(
        'No containers were found for the given user !',
      );
    }

    const parsedContainers: Container[] = containers.map((container) => {
      return {
        ...container,
        type: parseContainerType(container.type),
      };
    });

    return { containers: parsedContainers };
  }

  async findContainerPlants(
    input: FindContainerInput,
  ): Promise<PlantsResponse> {
    const plants = await this.prismaService.plant.findMany({
      where: { containerUuid: input.uuid },
    });

    if (!plants.length) {
      throw new NotFoundException(
        'No plants were found for the given container!',
      );
    }

    const parsedPlants: Plant[] = plants.map((plant) => {
      return {
        ...plant,
        type: parsePlantType(plant.type),
      };
    });

    return { plants: parsedPlants };
  }
}
