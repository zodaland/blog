import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { LogService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';

import fetch from "node-fetch";

@Injectable()
export class AuthService {
    private readonly path: string = './config/password.env';
    private readonly saltRounds: number = 10;
    constructor(
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
        private readonly logService: LogService,
    ) {}

    setPassword(password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.access(this.path, (err) => {
                if (!err) {
                    reject();
                    return;
                }
                bcrypt.hash(password, this.saltRounds, (err, hash) => {
                    if (err) {
                        reject();
                        return;
                    }
                    fs.writeFile(this.path, hash, (err) => {
                        if (err) {
                            reject();
                            return;
                        }
                        resolve();
                    });
                });
            });
        });
    }
    
    login(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.access(this.path, (err) => {
                if (err) {
                    reject();
                    return;
                }
                fs.readFile(this.path, 'utf-8', (err, hash) => {
                    if (err) {
                        reject();
                        return;
                    }
                    bcrypt.compare(password, hash, (err, result) => {
                        if (err || !result) {
                            reject();
                            return;
                        }
                        const token = this.jwtService.sign({});
                        
                        this.mailService.send({
                            subject: '블로그 인증 알림',
                            content: '블로그 인증됨',
                        });
                        
                        resolve({ token });
                    });
                });
            });
        });
    }

    async checkReCaptcha(token: string, ip: string): Promise<boolean> {
        try {
            const secret = this.configService.get('RECAPTCHA_TOKEN');
            const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}&remoteip=${ip}`;
            const res = await fetch(verificationURL);
            if (res.status !== 200) throw new Error('res status is not 200');
            const body = await res.json();
            
            return body.success;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'authService - checkReCaptcha 에러 발생',
                content: 'auth 로그 확인 요망',
            });
        }
    };
}
