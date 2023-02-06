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
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    };
  }
}
