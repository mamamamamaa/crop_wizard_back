import { Inject, Injectable } from '@nestjs/common';
import { IMAGE_PROVIDE } from '../../schemas/image/image.providers';
import { Image } from '../../types/image.interface';
import { Model, QueryOptions } from 'mongoose';
import { CreateImageDto } from '../../dto/image/create-image.dto';

@Injectable()
export class ImageService {
  constructor(
    @Inject(IMAGE_PROVIDE) private readonly imageModel: Model<Image>,
  ) {}

  async create(data: CreateImageDto) {
    return this.imageModel.create(data);
  }

  async findUserImages(
    owner: string,
    projection: string,
    options: QueryOptions<Image>,
    populateOptions: string,
  ) {
    return this.imageModel
      .find({ owner }, projection, options)
      .populate('owner', populateOptions);
  }

  async removeImage(publicId: string) {
    return this.imageModel.findOneAndRemove({ publicId });
  }
}
