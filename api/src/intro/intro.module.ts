import { Module } from '@nestjs/common';
import { IntroController } from './intro.controller';
import { IntroService } from './intro.service';
import { ConfigModule } from '../config/config.module';
import { LogModule } from '../log/log.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        ConfigModule.register({folder: './config' }),
        LogModule.register({ file: 'yaml' }),
        MailModule,
    ],
    controllers: [IntroController],
    providers: [IntroService],
})
export class IntroModule {}