import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MailService } from './services/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [UserModule, JwtModule],
  providers: [AuthService, MailService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
