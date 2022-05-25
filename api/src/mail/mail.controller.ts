import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MailService } from './mail.service';
import { InputMail } from './dto';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post()
    async send(@Body('inputMail') inputMail: InputMail): Promise<boolean> {
        try {
            const isSuccess: boolean = await this.mailService.send(inputMail);
            return isSuccess;
        } catch (error) {
            throw new BadRequestException();
        }
    }
}
