import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TagController} from './tag.controller';
import { TagService } from './tag.service';
import { TagMiddleware } from './tag.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { Tag } from './tag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board, Tag]),],
    controllers: [TagController],
    providers: [
        TagService,
    ],
})
export class TagModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(TagMiddleware)
            .forRoutes(TagController);
    }
}