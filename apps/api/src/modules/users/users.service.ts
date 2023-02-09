import { Injectable } from '@nestjs/common';

import { FindUserInput } from './dto/find-user.input';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {
  async findUser(input: FindUserInput): Promise<UserResponse> {
    return {
      user: {},
    };
  }
}
