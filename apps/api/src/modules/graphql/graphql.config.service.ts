import { __PROD__ } from '@modules/common/lib/constants';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import path from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    const schemaPath = path.join(process.cwd(), './src/schema.graphql');
    return {
      // schema options
      autoSchemaFile: schemaPath,
      sortSchema: true,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },

      cors: {
        origin: __PROD__
          ? process.env.CLIENT_URL_DEPLOY
          : process.env.CLIENT_URL,
        credentials: true,
      },
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
