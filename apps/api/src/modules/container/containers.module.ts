import { ImageUploadModule } from '@modules/image-upload/image-upload.module';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ContainersResolver } from './containers.resolver';
import { ContainersService } from './containers.service';

@Module({
  imports: [ImageUploadModule],
  providers: [PrismaService, ContainersService, ContainersResolver],
})
export class ContainersModule {}
