import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../../types/req.interface';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
          new FileTypeValidator({ fileType: /^image\/*/ }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Req() { user }: RequestWithUser,
  ) {
    return this.uploadService.addImage(image, user);
  }

  @Get()
  getUserImages(
    @Req() { user }: RequestWithUser,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.uploadService.getImageList(user, page, limit);
  }
}
