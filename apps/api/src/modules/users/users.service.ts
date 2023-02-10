import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { FindUserInput } from './dto/find-user.input';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUser(input: FindUserInput): Promise<UserResponse> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { uuid: input.uuid },
      });

      if (!user) {
        return {
          errors: [
            {
              field: 'input',
              message: 'No user found with the given input!',
            },
          ],
        };
      }

      return { user };
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
