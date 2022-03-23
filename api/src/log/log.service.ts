import { Injectable, Inject } from '@nestjs/common';
import { LOG_OPTIONS } from './constants';
import { LogOptions } from './interfaces';
import { ConfigService } from '../config/config.service';
import { createLogger, format, transports, Logger } from 'winston';
import { existsSync, mkdirSync } from 'fs';
import 'winston-daily-rotate-file'
import * as moment from 'moment';

declare global {
	interface Date {
		toFormat (format: string): string
	}
}

@Injectable()
export class LogService {
    private logger: Logger;

    constructor(@Inject(LOG_OPTIONS) options: LogOptions,
        private readonly configService: ConfigService) {
        const logDir: string = this.configService.get('LOG_DIR');
        !existsSync(logDir) && mkdirSync(logDir);
        this.logger = createLogger({
            level: 'debug',
            transports: [
                new transports.DailyRotateFile({
                    filename: `${logDir}/${options.file}.log`,
                    zippedArchive: true,
                    format: format.printf( info => `${moment().format('YYYY-MM-DD a h:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
                })
            ]
        });
    }
    
    debug(msg: string): void {
        this.logger.debug(msg);
    }
    info(msg: string): void {
        this.logger.info(msg);
    }
    warn(msg: string): void {
        this.logger.warn(msg);
    }
    error(msg: string): void {
        this.logger.error(msg);
    }
}