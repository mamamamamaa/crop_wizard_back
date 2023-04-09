import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from '../../schemas/user/user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
})
export class UserModule {}
