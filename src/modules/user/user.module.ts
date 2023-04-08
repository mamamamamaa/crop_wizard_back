import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from '../../schemas/user/user.providers';
import { MailerHelper } from '../../helpers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, MailerHelper],
})
export class UserModule {}
