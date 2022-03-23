import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { existsSync, mkdirSync } from 'fs';
import moment from 'moment';

export const writeLog = (fileName: string, msg: string) => {
    const logDir: string = process.env.LOGDIR ?? './logs';
    !existsSync(logDir) && mkdirSync(logDir);
    const logger = createLogger({
        level: 'debug',
        transports: [
            new transports.DailyRotateFile({
                filename: `${logDir}/${fileName}.log`,
                zippedArchive: true,
                format: format.printf(
                    (info) =>
                        `${moment().format(
                            'YYYY-MM-DD a h:mm:ss',
                        )} [${info.level.toUpperCase()}] - ${info.message}`,
                ),
            }),
        ],
    });

    logger.error(msg);
};
