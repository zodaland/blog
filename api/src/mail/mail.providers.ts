import { MAIL_SENDER } from './constants';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export const mailProviders = [
    {
        inject: [ConfigService],
        provide: MAIL_SENDER,
        useFactory: (configService: ConfigService) => nodemailer.createTransport({
                host: configService.get('MAIL_HOST'),
                secure: false,
                port: +configService.get('MAIL_PORT'),
                auth: {
                    user: configService.get('MAIL_USER'),
                    pass: configService.get('MAIL_PASSWORD'),
                },
                tls: {
                    rejectUnauthorized: false
                },
        }),
    },
];