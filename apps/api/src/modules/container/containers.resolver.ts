import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'nestjs-prisma';
import { CreateContainerInput } from './dto/create-container.input';
import { FindContainerInput } from './dto/find-container.input';
import { Container, ContainerType } from './models/container.model';
import { ContainerResponse } from './responses/container.response';
import { ContainersResponse } from './responses/containers.response';
import { ContainerType as PrismaContainerType } from '@prisma/client';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => ContainerResponse)
  async findContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerResponse> {
    try {
      const container = await this.prismaService.container.findUnique({
        where: {
          uuid: input.uuid,
        },
      });

      // Early return if not found.
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

  @Query(() => ContainersResponse)
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

  @Mutation(() => ContainerResponse)
  async createContainer(
    @Args('input') input: CreateContainerInput,
  ): Promise<ContainerResponse> {
    try {
      const container = await this.prismaService.container.create({
        data: {
          type:
            input.type === 'Bag'
              ? PrismaContainerType.Bag
              : PrismaContainerType.Plot,
          dirthDepth: input.dirtDepth,
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

  @Mutation(() => DeleteObjectResponse)
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
}
