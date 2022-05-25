import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/board.module';
import { TagModule } from './tags/tag.module';
import { MailModule } from './mail/mail.module';
import { IntroModule } from './intro/intro.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `./config/${process.env.NODE_ENV || 'development'}.env`,
            cache: true,
            isGlobal: true,
        }),
        IntroModule,
        MailModule,
        BoardModule,
        TagModule,
        CommentModule,
        TypeOrmModule.forRootAsync({
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
        AuthModule,
    ],
})
export class AppModule {}
