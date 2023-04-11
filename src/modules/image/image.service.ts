import { Injectable } from '@nestjs/common';
import { User } from '../../types/user.interface';

@Injectable()
export class ImageService {
  async addImage(image: Express.Multer.File, user: User) {}
}
