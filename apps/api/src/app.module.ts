import { ContainersModule } from '@modules/container/containers.module';
import { GqlConfigService } from '@modules/graphql/graphql.config.service';
import { UsersModule } from '@modules/users/users.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { loggingMiddleware, PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // Confige module setup.
    ConfigModule.forRoot({ isGlobal: true }),

    // Prisma module setup.
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),

    // Graphql module setup.
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    UsersModule,
    ContainersModule,
  ],
})
export class AppModule {}
