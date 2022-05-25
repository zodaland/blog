import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from '../boards/board.entity';
import { ICategory } from '../boards/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class TagMiddleware implements NestMiddleware {
    constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const paramKeys: string[] = Object.keys(req.params);
        if (paramKeys.length > 0) {
            const stringRegEx = /^[a-zA-Z0-9]+$/;
            const isValidParams = paramKeys.every((paramKey) =>
                stringRegEx.test(req.params[paramKey]),
            );
            if (!isValidParams) throw new BadRequestException();
        }
        const queryKeys: string[] = Object.keys(req.query);
        if (queryKeys.length > 0) {
            const stringRegEx = /^[a-zA-Z0-9가-힣]+$/;
            const arrayRegEx = /^\[("[a-zA-Z0-9가-힣.]+")+(,"[a-zA-Z0-9가-힣.]+")?\]$/;
            const isValidQuery = queryKeys.every(
                (queryKey) =>
                    stringRegEx.test(req.query[queryKey].toString()) ||
                    arrayRegEx.test(req.query[queryKey].toString()),
            );
            if (!isValidQuery) throw new BadRequestException();
        }
        if (req.params.category) {
            const category: string = req.params.category;
            const categoryRows: ICategory[] = await this.boardRepository
                .createQueryBuilder('board')
                .select('distinct category')
                .getRawMany();
            const categories: string[] = categoryRows.map((row: ICategory) => row.category);
            if (!categories.includes(category)) throw new BadRequestException();
        }
        next();
    }
}
