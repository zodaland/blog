import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: /.*zodaland\.com$/,
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: process.env.NODE_ENV === 'development' ? true : false,
        }),
    );
    await app.listen(3000);
}
bootstrap();
