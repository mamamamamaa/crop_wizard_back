import { Injectable } from '@nestjs/common';
import SendGridMail from '@sendgrid/mail';
import { Types } from 'mongoose';

@Injectable()
export class MailService {
  private sgMail = SendGridMail.setApiKey(prcess.env.SG_API_KEY);
  async verificationMessage(email: string) {
    const { SENDER_EMAIL, BASE_URL } = process.env;
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
