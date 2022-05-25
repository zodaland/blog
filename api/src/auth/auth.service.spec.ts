import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LogService } from '../log/log.service';
import { MailService } from '../mail/mail.service';

class MockLogService {
    error() {}
}
class MockMailService {
    send() {}
}
class MockConfigService {
    get() {}
}
class MockJwtService {
    sign() {}
}

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: LogService,
                    useValue: new MockLogService(),
                },
                {
                    provide: MailService,
                    useValue: new MockMailService(),
                },
                {
                    provide: ConfigService,
                    useValue: new MockConfigService(),
                },
                {
                    provide: JwtService,
                    useValue: new MockJwtService(),
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
