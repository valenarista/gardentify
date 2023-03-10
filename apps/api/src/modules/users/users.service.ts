import { GardentifyContext } from '@modules/graphql/graphql';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

import { FindUserInput } from './dto/find-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResponse } from './responses/user.response';

@Injectable()
export class UsersService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findUser(input: FindUserInput): Promise<UserResponse> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { uuid: input.uuid },
      });

      if (!user) {
        throw new NotFoundException('No user found with the given input!');
      }

      return { user };
    } catch (error) {
      throw new BadRequestException('An error ocurred!');
    }
  }

  async updateUser(input: UpdateUserInput): Promise<UserResponse> {
    try {
      const user = await this.prismaService.user.update({
        where: { uuid: input.uuid },
        data: { ...input },
      });

      if (!user) {
        throw new NotFoundException('No user found with the given input!');
      }

      return { user };
    } catch (error) {
      // Username already taken error.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Username ${input.username} is already taken!`,
        );
      }
    }
  }
}
