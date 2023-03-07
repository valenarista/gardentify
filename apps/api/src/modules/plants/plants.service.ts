import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { Plant } from './models/plant.model';
import { PlantResponse } from './responses/plant.response';
import { FindPlantInput } from './dto/find-plant.input';
import { parsePlantType } from './lib/plant-utils';
import { PlantsResponse } from './responses/plants.response';
import { CreatePlantInput } from './dto/create-plant.input';
import { parseContainerType } from '@modules/container/lib/container-utils';
import { UpdatePlantInput } from './dto/update-plant.input';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { FindPlantsInput } from './dto/find-plants.input';

@Injectable()
export class PlantsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findPlant(input: FindPlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: { container: { include: { user: true } } },
      });

      if (!plant) {
        throw new NotFoundException('No plant found with the given input!');
      }

      const parsedPlant: Plant = {
        ...plant,
        type: parsePlantType(plant.type),
        container: {
          ...plant.container,
          type: parseContainerType(plant.container.type),
        },
      };

      return { plant: parsedPlant };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findPlants(input: FindPlantsInput): Promise<PlantsResponse> {
    try {
      const cursor = input.cursor
        ? {
            uuid: input.cursor,
          }
        : undefined;

      const plants = await this.prismaService.plant.findMany({
        where: input.where,
        take: input.take ? input.take : undefined,
        cursor,
        orderBy: {
          createdAt: 'asc',
        },
      });

      if (!plants.length) {
        throw new NotFoundException('No plants were found!');
      }

      const parsedPlants: Plant[] = plants.map((plant) => {
        return {
          ...plant,
          type: parsePlantType(plant.type),
        };
      });

      const nextRequestCursor = parsedPlants[parsedPlants.length - 1].uuid;

      const hasMore = plants.length === (input.take ?? plants.length);

      return {
        plants: parsedPlants,
        cursor: nextRequestCursor,
        count: parsedPlants.length,
        hasMore,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async createPlant(input: CreatePlantInput): Promise<PlantResponse> {
    try {
      const plant = await this.prismaService.plant.create({
        data: {
          variety: input.variety,
          type: parsePlantType(input.type),
          seedsPlantedAt: input.seedsPlantedAt,
          seedsSproutedAt: input.seedsSproutedAt,
          container: { connect: { uuid: input.container.uuid } },
        },
        include: { container: true },
      });

      if (!plant) {
        throw new BadRequestException(
          'Could not create plant with the given input',
        );
      }

      const parsedPlant: Plant = {
        ...plant,
        type: parsePlantType(plant.type),
        container: {
          ...plant.container,
          type: parseContainerType(plant.container.type),
        },
      };

      return { plant: parsedPlant };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async deletePlant(input: FindPlantInput): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.plant.delete({
        where: { uuid: input.uuid },
      });
      return { deleted: true };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async updatePlant(input: UpdatePlantInput): Promise<PlantResponse> {
    try {
      const updatedPlant = await this.prismaService.plant.update({
        where: { uuid: input.uuid },
        data: {
          ...input,
        },
        include: { container: true },
      });

      if (!updatedPlant) {
        throw new NotFoundException('No plant found with the given input!');
      }

      const parsedPlant: Plant = {
        ...updatedPlant,
        type: parsePlantType(updatedPlant.type),
        container: {
          ...updatedPlant.container,
          type: parseContainerType(updatedPlant.container.type),
        },
      };

      return {
        plant: parsedPlant,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }
}
