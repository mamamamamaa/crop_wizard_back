import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDE } from '../../schemas/user/user.providers';
import { Model } from 'mongoose';
import { User } from '../../schemas/user/user.interface';
import { CreateUserDto } from '../../schemas/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }
}
