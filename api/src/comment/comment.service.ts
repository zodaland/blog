import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Status } from './interfaces';
import { CommentDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CommentService {
    private saltRounds = 10;

    constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

    async findAllByBoardId(boardId: number): Promise<Comment[]> {
        const comments: Comment[] = await this.commentRepository.find({
            select: ['name', 'comment', 'date', 'private', 'addedId'],
            where: {
                boardId,
            },
            order: {
                date: 'DESC',
            },
        });

        //비공개 댓글일시 댓글 제거
        const result: Comment[] = comments.map((comment) => ({
            ...comment,
            comment: comment.private ? '' : comment.comment,
        }));

        return result;
    }

    save(commentDto: CommentDto): Promise<void> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(commentDto.password, this.saltRounds, (err, password) => {
                if (err) {
                    reject();
                    return;
                }
                const comment: Comment = { ...commentDto, password };
                this.commentRepository
                    .save(comment)
                    .then(() => resolve())
                    .catch(() => reject());
            });
        });
    }

    //아이디 유효성 검증 후 파라미터로 받은 비밀번호를 해쉬한뒤 저장된 객체와 비교한다.
    //
    async delete(id: number, password: string): Promise<Status> {
        const comment = await this.commentRepository.findOne(id);
        if (!comment) {
            return { status: 404, message: '댓글을 찾을 수 없습니다.' };
        }

        const match = await bcrypt.compare(password, comment.password);
        if (!match) {
            return { status: 401, message: '비밀번호가 일치하지 않습니다.' };
        }

        await this.commentRepository.delete(id);
        return { status: 200 };
    }
}
