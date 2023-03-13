import { PrismaService } from '@modules/prisma/prisma.service';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateImageUploadInput } from './dto/create-image-upload.input';
import { FindImageUploadInput } from './dto/find-image-upload.input';
import { ImageUploadResponse } from './responses/image-upload.response';

@Injectable()
export class ImageUploadService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async findImageUpload(
    input: FindImageUploadInput,
  ): Promise<ImageUploadResponse> {
    try {
      const imageUpload = await this.prismaService.imageUpload.findUnique({
        where: { uuid: input.uuid },
      });

      if (!imageUpload) {
        throw new NotFoundException('No image found!');
      }

      return { imageUpload };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async createImageUpload(
    input: CreateImageUploadInput,
  ): Promise<ImageUploadResponse> {
    try {
      const imageUpload = await this.prismaService.imageUpload.create({
        data: {
          fileName: input.fileName,
          fileType: input.fileType,
        },
      });

      if (!imageUpload) {
        throw new NotFoundException('Could not create image!');
      }

      return { imageUpload };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }
}
