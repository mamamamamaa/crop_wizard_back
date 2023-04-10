import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailService } from './services/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
