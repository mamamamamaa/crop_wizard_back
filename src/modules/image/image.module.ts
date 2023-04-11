import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
