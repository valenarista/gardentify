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

  async me(context: GardentifyContext): Promise<UserResponse> {
    if (!context.req) {
      return {
        errors: [
          {
            field: 'user',
            message: 'An error ocurred',
          },
        ],
      };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!context.req.session.passport)
      throw new BadRequestException('No user is currently logged in!');

    const user = await this.prismaService.user.findUnique({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      where: { uuid: context.req.session.passport.user.uuid },
    });

    return { user };
  }

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
      console.log(err);

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
