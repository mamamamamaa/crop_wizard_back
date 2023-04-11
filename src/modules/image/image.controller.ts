import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addImage(@UploadedFile() image: Express.Multer.File, @Req() req) {
    return this.imageService.addImage(image, req.user);
  }
}
