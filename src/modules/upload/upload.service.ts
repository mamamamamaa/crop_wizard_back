import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import { ImageService } from '../image/image.service';
import { User } from '../../types/user.interface';
import { OptionalImageFields } from '../../types/image.interface';

@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService,
  ) {}

  async addImage(
    image: Express.Multer.File,
    user: User,
  ): Promise<OptionalImageFields> {
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

  async getImageList(user: User, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const { _id: owner } = user;

    return await this.imageService.findUserImages(
      owner,
      '',
      { skip, limit },
      'username email',
    );
  }
}
