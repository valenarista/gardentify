import { Args, Query, Resolver } from '@nestjs/graphql';
import { ContainersService } from './containers.service';
import { FindContainerInput } from './dto/find-container.input';
import { Container } from './models/container.model';
import { ContainerResponse } from './responses/container.response';

@Resolver(() => Container)
export class ContainersResolver {
  constructor(private containersService: ContainersService) {}

  @Query(() => ContainerResponse)
  async findContainer(
    @Args('input') input: FindContainerInput,
  ): Promise<ContainerResponse> {
    return await this.containersService.findContainer(input);
  }
}
