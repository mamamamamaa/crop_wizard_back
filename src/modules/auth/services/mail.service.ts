import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { Types } from 'mongoose';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SG_API_KEY'));
  }

  async send(email: string) {
    const senderEmail = this.configService.get<string>('SENDER_EMAIL');
    const baseUrl = this.configService.get<string>('BASE_URL');

    const verificationToken = new Types.ObjectId();
    const verifyMessage = {
      to: email,
      from: senderEmail,
      subject: 'Verification code',
      text: 'To verify your account you should click on link bellow',
      html: `<a target="_blank" href="${baseUrl}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    };
    const mail = await SendGrid.send(verifyMessage);
    return { mail, verificationToken };
  }
}
