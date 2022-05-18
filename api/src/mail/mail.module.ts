import { Module } from '@nestjs/common';
import { mailProviders } from './mail.providers';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
    controllers: [MailController],
    providers: [
        ...mailProviders,
        MailService,
    ],
    exports: [MailService],
})
export class MailModule {};