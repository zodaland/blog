import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    ParseIntPipe,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentDto } from './dto';
import { Status } from './interfaces';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('board/:id')
    async findAllByBoardId(@Param('id', ParseIntPipe) id: number): Promise<Comment[]> {
        try {
            return await this.commentService.findAllByBoardId(id);
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Post()
    async save(@Body('comment') commentDto: CommentDto): Promise<boolean> {
        console.log(commentDto);
        try {
            await this.commentService.save(commentDto);
            return true;
        } catch {
            throw new InternalServerErrorException();
        }
    }

    @Delete()
    async delete(@Body('id') id: number, @Body('password') password: string): Promise<boolean> {
        let result: Status;
        try {
            result = await this.commentService.delete(id, password);
        } catch {
            throw new InternalServerErrorException();
        }

        if (result.status === 200) {
            return true;
        } else if (result.status === 404) {
            throw new NotFoundException(result.message);
        } else if (result.status === 401) {
            throw new UnauthorizedException(result.message);
        }
    }
}
