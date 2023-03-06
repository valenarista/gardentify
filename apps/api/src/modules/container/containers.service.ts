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
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindUserContainersInput } from './dto/find-user-containers.input';
import { UpdateContainerInput } from './dto/update-container.input';
import { PlantsResponse } from '@modules/plants/responses/plants.response';
import { Plant } from '@modules/plants/models/plant.model';
import { parsePlantType } from '@modules/plants/lib/plant-utils';
import { PrismaService } from '@modules/prisma/prisma.service';
import { ContainerStatsResponse } from './responses/container-stats.response';
import { ContainerHarvestsResponse } from './responses/container-harvests.response';
import { ContainerHarvest } from './models/container-harvest.model';

@Injectable()
export class ContainersService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

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
        throw new NotFoundException(
          'Could not find container with the given input!',
        );
      }

      const parsedContainer: Container = {
        ...container,
        type: container.type === 'Bag' ? ContainerType.Bag : ContainerType.Plot,
      };

      return { container: parsedContainer };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
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
        throw new NotFoundException(
          'Could not find container with the given input!',
        );
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
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
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
        throw new NotFoundException('Could not create container!');
      }

      const parsedContainer: Container = {
        ...container,
        type: container.type === 'Bag' ? ContainerType.Bag : ContainerType.Plot,
      };

      return { container: parsedContainer };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
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
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
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
        throw new NotFoundException('No container found with the given input!');
      }

      const parsedContainer: Container = {
        ...updatedContainer,
        type: parseContainerType(updatedContainer.type),
      };

      return {
        container: parsedContainer,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
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
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async updateContainer(
    input: UpdateContainerInput,
  ): Promise<ContainerResponse> {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findUserContainers(
    input: FindUserContainersInput,
  ): Promise<ContainersResponse> {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findContainerPlants(
    input: FindContainerInput,
  ): Promise<PlantsResponse> {
    try {
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
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async calculateContainerStats(
    input: FindContainerInput,
  ): Promise<ContainerStatsResponse> {
    try {
      const container = await this.prismaService.container.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: {
          plants: { include: { harvests: { select: { weight: true } } } },
        },
      });

      if (!container) {
        throw new NotFoundException(
          'Could not find container with the given input!',
        );
      }

      const plantsCount = container.plants.length;
      const totalHarvests = container.plants
        .map((plant) => plant.harvests)
        .flat();
      const grossProduce = totalHarvests.reduce(
        (prev, curr) => prev + curr.weight,
        0,
      );

      return { grossProduce, plantsCount, harvestsCount: totalHarvests.length };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findContainerHarvests(
    input: FindContainerInput,
  ): Promise<ContainerHarvestsResponse> {
    try {
      const container = await this.prismaService.container.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: {
          plants: {
            include: {
              harvests: { select: { weight: true, createdAt: true } },
            },
          },
        },
      });

      if (!container) {
        throw new NotFoundException(
          'Could not find container with the given input!',
        );
      }

      const containerHarvests: ContainerHarvest[] = container.plants
        .map((plant) => {
          return plant.harvests.map((harvest) => {
            return { date: harvest.createdAt, weight: harvest.weight };
          });
        })
        .flat()
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );

      return { harvests: containerHarvests };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }
}
