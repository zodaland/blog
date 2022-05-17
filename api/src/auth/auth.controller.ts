import { Controller, Get, Put, Post, Query, Body, Req, BadRequestException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import { IToken } from './interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @UseGuards(JwtAuthGuard)
    @Get()
    pingpong(): any {
        return { ping: 'pong' };
    }
    @Get('recaptcha')
    async checkReCaptcha(@Query('token') token: string, @Req() { headers }: Request): Promise<boolean> {
        const ip = headers['x-real-ip'] as string;
        this.authService.checkReCaptcha(token, ip);
        return true;
    }
    @Put()
    async setPassword(@Body('password') password: string): Promise<void> {
        try {
            if (!password) throw new Error();
            await this.authService.setPassword(password);
        } catch {
            throw new BadRequestException();
        }
    }
    @Post()
    async login(@Body('password') password: string): Promise<IToken> {
        try {
            const token: IToken = await this.authService.login(password);
            return token;
        } catch (_) {
            throw new BadRequestException();
        }
    }
}
