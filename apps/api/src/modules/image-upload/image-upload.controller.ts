import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { ImageUploadService } from './image-upload.service';

@ApiTags('images')
@Controller({ path: 'images', version: '1' })
export class ImageUploadsController {
  constructor(private imageUploadService: ImageUploadService) {}

  @Get(':uuid/high-res')
  async getHighResImage(@Param('uuid') uuid: string, @Res() res: Response) {
    const converted = await this.imageUploadService.getConvertedImage(
      uuid,
      1024,
    );
    return res.end(converted);
  }

  @Get(':uuid/low-res')
  async getLowResImage(@Param('uuid') uuid: string, @Res() res: Response) {
    const converted = await this.imageUploadService.getConvertedImage(
      uuid,
      256,
      25,
    );
    return res.end(converted);
  }
}
