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
import fs from 'fs/promises';
import sharp from 'sharp';
import { DeleteObjectResponse } from '@modules/common/responses/delete-object.response';
import { deleteImageFile } from './lib/image-upload.utils';
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

  async deleteImageUpload(
    input: FindImageUploadInput,
  ): Promise<DeleteObjectResponse> {
    try {
      const imageUpload = await this.findImageUpload(input);
      await deleteImageFile(imageUpload.imageUpload.fileName);
      await this.prismaService.imageUpload.delete({
        where: { uuid: input.uuid },
      });
      return { deleted: true };
    } catch (err) {
      if (err instanceof Error) {
        throw new BadRequestException(err.message);
      }
    }
  }

  async getConvertedImage(uuid: string, resize = 512, quality = 75) {
    try {
      const imageUpload = await this.findImageUpload({
        uuid,
      });

      if (!imageUpload)
        throw new NotFoundException('No image found with the given uuid');

      const imageData = await fs.readFile(
        `./uploads/${imageUpload.imageUpload.fileName}`,
      );
      const buffer = Buffer.from(imageData);
      return await sharp(buffer).resize(resize).webp({ quality }).toBuffer();
    } catch (err) {
      console.log({ err });

      throw new BadRequestException('An error ocrrued while converting image!');
    }
  }
}
