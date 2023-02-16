import { IConfig } from '@modules/config/config.module';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, SendMailOptions } from 'nodemailer';
import { resolve } from 'path';
import { renderFile } from 'eta';

type MailOptions = Partial<SendMailOptions> & {
  template: string;
  replacements: Record<string, any>;
};

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService<IConfig>) {}

  async sendEmail(options: MailOptions) {
    const transporter = createTransport({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      auth: {
        user: this.configService.get('mailer', { infer: true }).username,
        pass: this.configService.get('mailer', { infer: true }).password,
      },
      host: this.configService.get('mailer', { infer: true }).host,
      port: this.configService.get('mailer', { infer: true }).port,
      secure: this.configService.get('mailer', { infer: true }).secure,
      tls: { rejectUnauthorized: false },
    });

    const templatePath = resolve(
      `${__dirname}/../../resources/templates/${options.template}.eta`,
    );

    const html = await renderFile(templatePath, options.replacements, options);
    options.html = html;

    return transporter.sendMail(options);
  }
}
