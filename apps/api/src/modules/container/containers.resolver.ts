import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateContainerInput } from './dto/create-container.input';
import { FindContainerInput } from './dto/find-container.input';
import { Container } from './models/container.model';
import { ContainerResponse } from './responses/container.response';
import { ContainersResponse } from './responses/containers.response';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { AddPlantToContainerInput } from './dto/add-plant-to-container.input';
import { RemovePlantFromContainerInput } from './dto/remove-plant-from-container.input';
import { ContainersService } from './containers.service';
import { FindUserContainersInput } from './dto/find-user-containers.input';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(private containersService: ContainersService) {}

  @Query(() => ContainerResponse)
  async findContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.findContainer(input);
  }

  @Query(() => ContainersResponse)
  async findContainers(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainersResponse> {
    return await this.containersService.findContainers(input);
  }

  @Mutation(() => ContainerResponse)
  async createContainer(
    @Args('input') input: CreateContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.createContainer(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async deleteContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<DeleteObjectResponse> {
    return await this.containersService.deleteContainer(input);
  }

  @Mutation(() => ContainerResponse)
  async addPlantToContainer(
    @Args('input') input: AddPlantToContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.addPlantToContainer(input);
  }

  @Mutation(() => DeleteObjectResponse)
  async removePlantFromContainer(
    @Args('input') input: RemovePlantFromContainerInput,
  ): Promise<DeleteObjectResponse> {
    return await this.containersService.removePlantFromContainer(input);
  }

  @Query(() => ContainersResponse)
  async findUserContainers(
    @Args('input') input: FindUserContainersInput,
  ): Promise<ContainersResponse> {
    return await this.containersService.findUserContainers(input);
  }
}
