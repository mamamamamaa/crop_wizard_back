import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ImageService } from '../image/image.service';
import { User } from '../../types/user.interface';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService,
  ) {}

  async addImage(image: Express.Multer.File, user: User) {
    const { originalname } = image;
    const { _id: owner } = user;

    const { public_id, secure_url } = await this.cloudinaryService.uploadImage(
      image,
    );

    return await this.imageService.create({
      url: secure_url,
      fileName: originalname,
      publicId: public_id,
      owner,
    });
  }
}
