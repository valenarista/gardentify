import { IConfig } from '@modules/config/config.module';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import path from 'path';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService<IConfig>) {}
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
        origin: this.configService.get('app', { infer: true }).clientUrl,
        credentials: true,
      },
      installSubscriptionHandlers: true,
      debug: true,
      playground: true,
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
