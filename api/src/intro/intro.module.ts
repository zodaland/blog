import { Module } from '@nestjs/common';
import { IntroController } from './intro.controller';
import { IntroService } from './intro.service';
import { LogModule } from '../log/log.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [LogModule.register({ file: 'yaml' }), MailModule],
    controllers: [IntroController],
    providers: [IntroService],
})
export class IntroModule {}
