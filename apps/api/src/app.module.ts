import { AuthModule } from '@modules/auth/auth.module';
import { GlobalConfigModule } from '@modules/config/config.module';
import { ContainersModule } from '@modules/container/containers.module';
import { GqlConfigService } from '@modules/graphql/graphql.config.service';
import { HeightRegistrationsModule } from '@modules/height-registration/height-registration.module';
import { PlantsModule } from '@modules/plants/plants.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { UsersModule } from '@modules/users/users.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    // Confige module setup.
    GlobalConfigModule,

    // Graphql module setup.
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    ContainersModule,
    PlantsModule,
    HeightRegistrationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
