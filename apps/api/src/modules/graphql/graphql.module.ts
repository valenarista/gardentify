import {
  getTokensFromRequest,
  getUserUUIDFromToken,
  RequestWithCookies,
} from '@modules/auth/auth.utils';
import { __PROD__ } from '@modules/common/lib/constants';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { GardentifyContext } from './graphql';

const useFactory = async (
  usersService: UsersService,
): Promise<ApolloDriverConfig> => ({
  context: async ({
    req,
  }: {
    req: RequestWithCookies;
  }): Promise<GardentifyContext> => {
    const authTokens = getTokensFromRequest(req);
    const userUuid = getUserUUIDFromToken(authTokens.accessToken);

    const user = userUuid
      ? await usersService.findUser({ uuid: userUuid })
      : null;

    return {
      authTokens,
      user: user ? user.user : null,
    };
  },

  autoSchemaFile: path.join(
    process.cwd(),
    './src/modules/graphql/schema.graphql',
  ),
  sortSchema: true,
  buildSchemaOptions: {
    numberScalarMode: 'integer',
  },

  installSubscriptionHandlers: true,
  csrfPrevention: __PROD__,
  playground: !__PROD__,
});

export default GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  imports: [UsersModule],
  inject: [UsersService],
  useFactory,
});
