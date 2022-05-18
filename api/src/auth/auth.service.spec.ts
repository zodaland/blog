import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LogModule } from '../log/log.module';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: jwtConstants.secret,
                }),
                LogModule.register({ file: 'auth' }),
                ConfigModule.forRoot({
                    envFilePath: './config/development.env',
                }),
                MailModule,
            ],
            providers: [AuthService, JwtStrategy],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
});
