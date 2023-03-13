import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { HarvestResponse } from './responses/harvest.response';
import { FindHarvestInput } from './dto/find-harvest.input';
import { HarvestsResponse } from './responses/harvests.response';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Harvest } from './models/harvests.model';
import { parsePlantType } from '@modules/plants/lib/plant-utils';
import { FindHarvestsInput } from './dto/find-harvests.input';
import { FindWeekHarvestsInput } from './dto/find-week-harvests.input';
import { FindPlantHarvestsInput } from './dto/find-plant-harvests.input';
import { FindLatestsHarvestsInput } from './dto/find-latests-harvests.input';

@Injectable()
export class HarvestsService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findHarvest(input: FindHarvestInput): Promise<HarvestResponse> {
    try {
      const harvest = await this.prismaService.harvest.findUnique({
        where: {
          uuid: input.uuid,
        },
        include: { plant: true },
      });

      if (!harvest) {
        throw new NotFoundException(
          'Could not find harvest with the given input!',
        );
      }

      const parsedHarvest: Harvest = {
        ...harvest,
        plant: {
          ...harvest.plant,
          type: parsePlantType(harvest.plant.type),
        },
      };

      return { harvest: parsedHarvest };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findHarvests(input: FindHarvestsInput): Promise<HarvestsResponse> {
    try {
      const cursor = input.cursor
        ? {
            uuid: input.cursor,
          }
        : undefined;

      const harvests = await this.prismaService.harvest.findMany({
        where: input.where,
        take: input.take ? input.take : undefined,
        cursor,
        orderBy: {
          createdAt: 'asc',
        },
        include: { plant: input.includePlant },
      });

      if (!harvests.length) {
        throw new NotFoundException('No harvests were found!');
      }

      const parsedHarvets: Harvest[] = harvests.map((harvest) => {
        return {
          ...harvest,
          plant: {
            ...harvest.plant,
            type: parsePlantType(harvest.plant.type),
          },
        };
      });

      const nextRequestCursor = parsedHarvets[parsedHarvets.length - 1].uuid;

      const hasMore = harvests.length === (input.take ?? harvests.length);

      return {
        harvests: parsedHarvets,
        cursor: nextRequestCursor,
        count: parsedHarvets.length,
        hasMore,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findPlantHarvests(
    input: FindPlantHarvestsInput,
  ): Promise<HarvestsResponse> {
    try {
      const cursor = input.cursor
        ? {
            uuid: input.cursor,
          }
        : undefined;

      const harvests = await this.prismaService.harvest.findMany({
        where: {
          plant: { ...input.where },
        },
        take: input.take ? input.take : undefined,
        cursor,
        orderBy: {
          createdAt: 'asc',
        },
      });

      if (!harvests.length) {
        throw new NotFoundException('No harvests were found!');
      }

      const nextRequestCursor = harvests[harvests.length - 1].uuid;

      const hasMore = harvests.length === (input.take ?? harvests.length);

      return {
        harvests,
        cursor: nextRequestCursor,
        count: harvests.length,
        hasMore,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async createHarvest(input: CreateHarvestInput): Promise<HarvestResponse> {
    try {
      const harvest = await this.prismaService.harvest.create({
        data: {
          weight: input.weight,
          quantity: input.quantity,
          plantUuid: input.plant.uuid,
        },
      });

      if (!harvest) {
        throw new NotFoundException(
          'Could not create harvest with the given input!',
        );
      }

      return { harvest };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async deleteHarvest(input: FindHarvestInput): Promise<DeleteObjectResponse> {
    try {
      await this.prismaService.harvest.delete({
        where: { uuid: input.uuid },
      });
      return { deleted: true };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async updateHarvest(input: UpdateHarvestInput): Promise<HarvestResponse> {
    try {
      const updatedHarvest = await this.prismaService.harvest.update({
        where: { uuid: input.uuid },
        data: {
          ...input,
        },
        include: { plant: true },
      });

      if (!updatedHarvest) {
        throw new NotFoundException(
          'Could not update harvest with the given input!',
        );
      }

      const parsedHarvest: Harvest = {
        ...updatedHarvest,
        plant: {
          ...updatedHarvest.plant,
          type: parsePlantType(updatedHarvest.plant.type),
        },
      };

      return { harvest: parsedHarvest };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findLatestsHarvests(
    input: FindLatestsHarvestsInput,
  ): Promise<HarvestsResponse> {
    try {
      const harvests = await this.prismaService.harvest.findMany({
        where: {
          plant: {
            container: {
              user: {
                uuid: input.userUuid,
              },
            },
          },
        },
        include: { plant: input.includePlant },
        orderBy: { createdAt: 'desc' },
        take: input.take ?? undefined,
      });

      if (harvests.length === 0) {
        throw new NotFoundException(
          'Could not find harvests with the given input!',
        );
      }

      const parsedHarvets: Harvest[] = harvests.map((harvest) => {
        return {
          ...harvest,
          plant: {
            ...harvest.plant,
            type: parsePlantType(harvest.plant.type),
          },
        };
      });

      return {
        harvests: parsedHarvets,
        count: harvests.length,
        cursor: '',
        hasMore: false,
      };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findWeekHarvests(
    input: FindWeekHarvestsInput,
  ): Promise<HarvestsResponse> {
    try {
      const pastWeek = 7 * 24 * 60 * 60 * 1000;
      const harvests = await this.prismaService.harvest.findMany({
        where: {
          plant: {
            container: {
              user: {
                uuid: input.userUuid,
              },
            },
          },
          createdAt: {
            gte: new Date(Date.now() - pastWeek),
          },
        },

        orderBy: { createdAt: 'asc' },
      });

      if (harvests.length === 0) {
        throw new NotFoundException(
          'Could not find harvests with the given input!',
        );
      }

      return { harvests, count: harvests.length, cursor: '', hasMore: false };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }
}
