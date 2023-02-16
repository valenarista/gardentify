import { join } from 'node:path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { cwd } from 'process';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(cwd(), '/src/resources'),
      serveStaticOptions: {
        maxAge: 86_400, // 1 day
      },
      exclude: ['/v1*', '/api*', '/graphql', '/docs*', '/health*', '/swagger*'],
    }),
  ],
  exports: [ServeStaticModule],
})
export class NestServeStaticModule {}
