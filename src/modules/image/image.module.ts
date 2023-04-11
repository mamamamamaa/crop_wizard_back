import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { DatabaseModule } from '../../database/database.module';
import { imageProviders } from '../../schemas/image/image.providers';

@Module({
  imports: [DatabaseModule],
  providers: [ImageService, ...imageProviders],
  exports: [ImageService],
})
export class ImageModule {}
