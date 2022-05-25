import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MAIL_SENDER } from './constants';
import { Transporter } from 'nodemailer';
import { IMail } from './interfaces';

@Injectable()
export class MailService {
    constructor(
        @Inject(MAIL_SENDER) private transporter: Transporter,
        private readonly configService: ConfigService,
    ) {}

    async send(mailInput: IMail): Promise<boolean> {
        let text: string = mailInput.content;
        if (mailInput.name)
            text = `
${mailInput.name}
${text}
`;
        if (mailInput.email)
            text = `
${mailInput.email}
${text}
`;

        const body = {
            from: this.configService.get('MAIL_FROM'),
            to: this.configService.get('MAIL_TO'),
            subject: mailInput.subject,
            text,
        };
        const result = await this.transporter.sendMail(body);
        return result.response || result.response.split(' ')[0] != '250' ? true : false;
    }
}
