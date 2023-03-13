import { PrismaService } from '@modules/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ImageUploadService } from './image-upload.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [PrismaService, ImageUploadService],
  controllers: [],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
