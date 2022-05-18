import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogService } from '../log/log.service';
import { MailService } from '../mail/mail.service';
import { Intro } from './dto';
import * as yaml from 'yaml';
import { readFile, writeFile } from 'fs';

@Injectable()
export class IntroService {
    private path: string;
    private defaultIntro: Intro;
    
    constructor(
        private readonly configService: ConfigService,
        private readonly logService: LogService,
        private readonly mailService: MailService,
    ) {
        this.path = this.configService.get('YAML');
        this.defaultIntro = new Intro();
        this.defaultIntro.name = '캥미뭉';
        this.defaultIntro.introduce = '<p>개발자 입니다.</p>';
    }

    async getIntro(): Promise<Intro> {
        return new Promise((resolve, _) => {
            readFile(this.path, 'utf-8', (err, rawIntro) => {
                if (err) {
                    this.logService.error(JSON.stringify(err));
                    this.mailService.send({
                        subject: 'introService - getIntro 에러 발생',
                        content: 'yaml 로그 확인 요망',
                    });
                    resolve(this.defaultIntro);
                } else {
                    const intro: Intro|null = yaml.parse(rawIntro);
                    if (!intro) {
                        resolve(this.defaultIntro);
                    } else {
                        resolve(intro);
                    }
                }
            });
        });
    }

    async setIntro(intro: Intro): Promise<boolean> {
        const rawIntro: string = yaml.stringify(intro);
        return new Promise((resolve, reject) => {
            writeFile(this.path, rawIntro, 'utf-8', (err) => {
                if (err) {
                    this.logService.error(JSON.stringify(err));
                    this.mailService.send({
                        subject: 'IntroService - getIntro 에러 발생',
                        content: 'yaml 로그 확인 요망',
                    });
                    reject(false);
                }
                resolve(true);
            });
        });
    }
}