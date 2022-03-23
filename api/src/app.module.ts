import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards/board.entity';
import { BoardModule } from './boards/board.module';
import { TagModule } from './tags/tag.module';
import { MailModule } from './mail/mail.module';
import { IntroModule } from './intro/intro.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        IntroModule,
        MailModule,
        BoardModule,
        TagModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.register({folder: './config' })],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: +configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
            }),
        }),
        TypeOrmModule.forFeature([Board]),
        AuthModule,
    ],
})
export class AppModule { }