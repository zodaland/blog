import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardMiddleware } from './board.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardTag } from './board_tag.entity';
import { Tag } from '../tags/tag.entity';
import { LogModule } from '../log/log.module';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, Tag, BoardTag]),
        LogModule.register({ file: 'board' }),
        MailModule,
    ],
    controllers: [BoardController],
    providers: [BoardService],
})
export class BoardModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(BoardMiddleware).forRoutes(BoardController);
    }
}
