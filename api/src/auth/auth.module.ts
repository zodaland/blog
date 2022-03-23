import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { LogModule } from '../log/log.module';
import { ConfigModule } from '../config/config.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
        LogModule.register({ file: 'auth' }),
        ConfigModule.register({ folder: './config' }),
        MailModule,
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}
