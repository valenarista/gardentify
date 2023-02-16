import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [PrismaService, UsersResolver, UsersService],
})
export class UsersModule {}
