import { AuthModule } from '@modules/auth/auth.module';
import { GlobalConfigModule } from '@modules/config/config.module';
import { ContainersModule } from '@modules/container/containers.module';
import { HarvestsModule } from '@modules/harvests/harvests.module';
import { HeightRegistrationsModule } from '@modules/height-registration/height-registration.module';
import { MailerModule } from '@modules/mailer/mailer.module';
import { PlantsModule } from '@modules/plants/plants.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { NestServeStaticModule } from '@modules/static/serve-static.module';
import { TwoFactorModule } from '@modules/twofactor/twofactor.module';
import { UsersModule } from '@modules/users/users.module';
import { WeatherModule } from '@modules/weather/weather.module';
import { Module } from '@nestjs/common';
import { ImageUploadModule } from '@modules/image-upload/image-upload.module';
import { GraphQLModule } from '@nestjs/graphql';
import { getTokensFromRequest, getSub } from '@modules/auth/auth.utils';
import { __PROD__ } from '@modules/common/lib/constants';
import { GardentifyContext } from '@modules/graphql/graphql';
import { RefreshTokensModule } from '@modules/refresh-tokens/refresh-tokens.module';
import { RefreshTokensService } from '@modules/refresh-tokens/refresh-tokens.service';
import { User } from '@modules/users/models/user.model';
import { UsersService } from '@modules/users/users.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLSchema } from 'graphql';
import path from 'path';
import { GraphQLUpload } from 'graphql-upload-minimal';

const useFactory = async (
  refreshTokensService: RefreshTokensService,
  usersService: UsersService,
): Promise<ApolloDriverConfig> => ({
  context: async ({ req }: { req: Request }): Promise<GardentifyContext> => {
    const authTokens = getTokensFromRequest(req);
    const userUuid = getSub(authTokens.accessToken);

    const userResponse = userUuid
      ? await usersService.findUser({ uuid: userUuid })
      : null;

    let user: User | null = null;
    if (userResponse && userResponse.user) {
      user = userResponse.user;
    }

    return {
      authTokens,
      refreshTokensService,
      usersService,
      user,
    };
  },

  transformSchema: (schema: GraphQLSchema) => {
    // schema = applyMiddleware(schema, shieldPermissions);
    return schema;
  },

  resolvers: {
    Upload: GraphQLUpload,
  },

  autoSchemaFile: path.join(
    process.cwd(),
    './src/modules/graphql/schema.graphql',
  ),
  buildSchemaOptions: {
    numberScalarMode: 'integer',
  },
  csrfPrevention: __PROD__,
  playground: !__PROD__,
});

@Module({
  imports: [
    GlobalConfigModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [RefreshTokensModule, UsersModule],
      inject: [RefreshTokensService, UsersService],
      useFactory,
    }),
    ImageUploadModule,
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
