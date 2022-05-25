import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    InternalServerErrorException,
} from '@nestjs/common';
import { IntroService } from './intro.service';
import { Intro } from './dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('intro')
export class IntroController {
    constructor(private readonly introService: IntroService) {}

    @Get()
    async getIntro(): Promise<Intro> {
        try {
            return await this.introService.getIntro();
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async setIntro(@Body() intro: Intro): Promise<boolean> {
        try {
            return await this.introService.setIntro(intro);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}
