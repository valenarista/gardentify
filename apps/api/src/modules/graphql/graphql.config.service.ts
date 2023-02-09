import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
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
        origin: 'http://localhost:3000',
        credentials: true,
      },
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    };
  }
}
