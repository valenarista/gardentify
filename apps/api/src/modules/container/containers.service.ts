import { Injectable } from '@nestjs/common';

import { FindContainerInput } from './dto/find-container.input';
import { ContainerResponse } from './responses/container.response';

@Injectable()
export class ContainersService {
  async findContainer(input: FindContainerInput): Promise<ContainerResponse> {
    return {
      container: {},
    };
  }
}
