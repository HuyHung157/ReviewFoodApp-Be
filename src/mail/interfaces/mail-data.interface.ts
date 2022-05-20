import { MailTemplate } from './mail-template.interface';

export interface MailAttachment {
  base64Content: string;
  filename: string;
  type: string;
}

export interface MailData extends MailTemplate {
  to: string;
  bcc?: string;
  attachment?: MailAttachment;
}
