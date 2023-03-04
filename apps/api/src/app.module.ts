import { AuthModule } from '@modules/auth/auth.module';
import { GlobalConfigModule } from '@modules/config/config.module';
import { ContainersModule } from '@modules/container/containers.module';
import { GqlConfigService } from '@modules/graphql/graphql.config.service';
import { HarvestsModule } from '@modules/harvests/harvests.module';
import { HeightRegistrationsModule } from '@modules/height-registration/height-registration.module';
import { MailerModule } from '@modules/mailer/mailer.module';
import { PlantsModule } from '@modules/plants/plants.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { NestServeStaticModule } from '@modules/static/serve-static.module';
import { TwoFactorModule } from '@modules/twofactor/twofactor.module';
import { UsersModule } from '@modules/users/users.module';
import { WeatherModule } from '@modules/weather/weather.module';
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
    MailerModule,
    TwoFactorModule,
    HarvestsModule,
    WeatherModule,
    NestServeStaticModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
