import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [ImageModule, CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
