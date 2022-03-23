import { Module, DynamicModule } from '@nestjs/common';
import { LogService } from './log.service';
import { ConfigModule } from '../config/config.module';
import { LOG_OPTIONS } from './constants';

export interface LogModuleOptions {
    file: string;
}

@Module({})
export class LogModule {
    static register(options: LogModuleOptions): DynamicModule {
        return {
            module: LogModule,
            providers: [
                {
                    provide: LOG_OPTIONS,
                    useValue: options,
                },
                LogService,
            ],
            exports: [LogService],
            imports: [ConfigModule.register({ folder: './config' })],
        };
    }
}