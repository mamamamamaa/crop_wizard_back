import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDE } from '../../schemas/user/user.providers';
import { Model } from 'mongoose';
import { User } from '../../schemas/user/user.interface';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDE) private readonly userModel: Model<User>) {}
}
