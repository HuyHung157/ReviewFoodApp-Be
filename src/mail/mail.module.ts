import { LoggerService, Module } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MailSendGridService } from './services/mail-sendgrid.service';
import { MailTemplateService } from './services/mail-template.service';
import { MailService } from './services/mail.service';

@Module({
  providers: [{
    provide: MailService,
    useFactory: (logger: LoggerService) => {
      return new MailSendGridService(logger);
    },
    inject: [WINSTON_MODULE_NEST_PROVIDER],
  },
  MailTemplateService,
],
  exports: [MailService, MailTemplateService],
})
export class MailModule {}
