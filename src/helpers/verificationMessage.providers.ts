import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailerHelper {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async verificationMessage(email: string) {
    const { SENDER_EMAIL, BASE_URL } = this.configService.get('app');
    const verificationToken = new Types.ObjectId();
    const verifyMessage = {
      to: email,
      from: SENDER_EMAIL,
      subject: 'Verification code',
      text: 'To verify your account you should click on link bellow',
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    };
    await this.mailerService.sendMail(verifyMessage);
    return verificationToken;
  }
}
