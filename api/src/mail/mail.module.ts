import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { mailProviders } from './mail.providers';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
    imports: [ConfigModule.register({ folder: './config' })],
    controllers: [MailController],
    providers: [
        ...mailProviders,
        MailService,
    ],
    exports: [MailService],
})
export class MailModule {};