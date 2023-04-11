import { Module } from '@nestjs/common';
import { CloudinaryProviders } from './cloudinary.providers';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProviders, CloudinaryService],
  exports: [CloudinaryProviders, CloudinaryService],
})
export class CloudinaryModule {}
