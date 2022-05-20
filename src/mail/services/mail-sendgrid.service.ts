import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { MailDataRequired } from '@sendgrid/helpers/classes/mail';
import sgMailService from '@sendgrid/mail';
import { AttachmentData } from '@sendgrid/helpers/classes/attachment';
import { MailData } from '../interfaces/mail-data.interface';
import { MailService } from './mail.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MailSendGridService extends MailService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
    ) {
    super();
    const key = process.env.SENDGRID_API_KEY;
    sgMailService.setApiKey(key);
  }

  public async sendMail(mail: MailData): Promise<any> {
    const from = process.env.MAIL_FROM;
    const mailData: MailDataRequired = {
      from,
      to: mail.to,
      bcc: mail.bcc,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    };
    if (mail.attachment) {
      const attachment: AttachmentData = {
        content: mail.attachment.base64Content,
        filename: mail.attachment.filename,
        type: mail.attachment.type,
        disposition: 'attachment',
      };
      mailData.attachments = [attachment];
    }

    return new Promise(async (resolve, reject) => {
      try {
        const response = await sgMailService.send(mailData);
        this.logger.log(`Mail sent to ${mail.to}!`);
        resolve(response);
      } catch (error) {
        this.logger.error(error);
        reject(error);
      }
    });
  }
}
