import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [UserModule, MailerModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
