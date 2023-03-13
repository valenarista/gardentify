import { getTokensFromRequest, getSub } from '@modules/auth/auth.utils';
import { applyMiddleware } from 'graphql-middleware';
import shieldPermissions from '@modules/auth/shields/shield.permissions';
import { __PROD__ } from '@modules/common/lib/constants';
import { RefreshTokensService } from '@modules/refresh-tokens/refresh-tokens.service';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { GardentifyContext } from './graphql';
import { RefreshTokensModule } from '@modules/refresh-tokens/refresh-tokens.module';
import { GraphQLSchema } from 'graphql';
import { User } from '@modules/users/models/user.model';

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

  autoSchemaFile: path.join(
    process.cwd(),
    './src/modules/graphql/schema.graphql',
  ),
  sortSchema: true,
  buildSchemaOptions: {
    numberScalarMode: 'integer',
    dateScalarMode: 'isoDate',
  },
  csrfPrevention: __PROD__,
  playground: !__PROD__,
});

export const GraphQLModule = NestGraphQLModule.forRootAsync<ApolloDriverConfig>(
  {
    driver: ApolloDriver,
    imports: [RefreshTokensModule, UsersModule],
    inject: [RefreshTokensService, UsersService],
    useFactory,
  },
);
