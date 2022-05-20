import { Injectable, Logger } from '@nestjs/common';
import Email from 'email-templates';
import path from 'path';
import { MailTemplate } from '../interfaces/mail-template.interface';

@Injectable()
export class MailTemplateService {
  private readonly logger = new Logger(MailTemplateService.name);

  constructor() { }

  /**
   * Fetch email tempalte
   */
  public async fetchTemplate(templateName: string, data: any, language = 'en'): Promise<MailTemplate> {
    const envTemplatesPath = process.env.MAIL_TEMPLATES_PATH;
    if (!envTemplatesPath) {
      this.logger.error('MAIL_TEMPLATES_PATH not found');
    }
    const email = this.getEmailObject(envTemplatesPath, language);
    const result: MailTemplate = await email.renderAll(templateName, data) as MailTemplate;
    if (!result.subject) {
      this.logger.warn('Missing mail subject');
    }
    if (!result.html) {
      this.logger.warn('Missing mail html');
    }
    if (!result.text) {
      this.logger.warn('Missing mail text');
    }
    return result;
  }

  private getEmailObject(envTemplatesPath: string, language = 'en') {
    const segments = [__dirname, envTemplatesPath, language.toLowerCase()].filter(v => v);
    const templatesPath = path.resolve(...segments);
    const email = new Email({
      message: {},
      views: {
        root: templatesPath,
        options: { extension: 'ejs' },
      },
    });
    return email;
  }
}
