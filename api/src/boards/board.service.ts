import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Board } from './board.entity';
import { BoardTag } from './board_tag.entity';
import { Tag } from '../tags/tag.entity';
import { ICategory } from './interfaces';
import { parse } from 'node-html-parser';
import { Connection } from 'typeorm';
import { LogService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';

import fetch from 'node-fetch';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board) private boardRepository: Repository<Board>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(BoardTag) private boardTagRepository: Repository<BoardTag>,
        private readonly configService: ConfigService,
        private readonly logService: LogService,
        private readonly mailService: MailService,
        private connection: Connection,
    ) {}
    async getCategoryAll(): Promise<string[]> {
        try {
            const categoryRows: ICategory[] = await this.boardRepository
                .createQueryBuilder('board')
                .select('distinct category')
                .groupBy('category')
                .orderBy('MIN(date)', 'ASC')
                .getRawMany();
            const categories: string[] = categoryRows.map((row: ICategory) => row.category);
            return categories;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getBoardIdAllByCategory 에러 발생',
                content: 'board로그 확인 요망',
            });
        }
    }
    async getBoardIdAll(): Promise<Board[]> {
        try {
            return this.boardRepository
                .createQueryBuilder('board')
                .select(['id', 'category'])
                .where('private = false')
                .getRawMany();
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getBoardIdAll 에러 발생',
                content: 'board로그 확인 요망',
            });
        }
    }
    async getBoardIdAllByCategory(category: string): Promise<number[]> {
        try {
            const boardIdRows: Board[] = await this.boardRepository
                .createQueryBuilder('board')
                .select('board.id')
                .where('category = :category', { category })
                .andWhere('private = false')
                .getMany();
            const boardIds: number[] = boardIdRows.map((row: Board) => row.id);
            return boardIds;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getBoardIdAllByCategory 에러 발생',
                content: 'board로그 확인 요망',
            });
        }
    }
    async getOne(category: string, id: number): Promise<Board> {
        try {
            const row: Board | undefined = await this.boardRepository
                .createQueryBuilder('board')
                .leftJoinAndSelect('board.boardTags', 'boardTag')
                .leftJoinAndSelect('boardTag.tag', 'tag')
                .where('board.category = :category', { category })
                .andWhere('board.id = :id', { id })
                .getOne();
            return row;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getOne 에러 발생',
                content: 'board로그 확인 요망',
            });
        }
    }
    async getMore(
        category: string,
        page: number,
        offset: number,
        tags: string[] | null,
    ): Promise<Board[]> {
        const skip: number = (page - 1) * offset;
        let rawRows: Board[];

        try {
            const qb = this.boardRepository
                .createQueryBuilder('board')
                .leftJoinAndSelect('board.boardTags', 'boardTag')
                .leftJoinAndSelect('boardTag.tag', 'tag')
                .where('board.category = :category', { category })
                .andWhere('private = false')
                .orderBy('board.date', 'DESC')
                .skip(skip)
                .take(offset);

            if (tags) {
                const boardTagRows = await this.boardTagRepository
                    .createQueryBuilder('boardTag')
                    .select('boardTag.board_id as id')
                    .leftJoin('boardTag.tag', 'tag')
                    .where('tag.name IN (:tags)', { tags })
                    .getRawMany();
                const boardIds = boardTagRows.map((row: BoardTag) => row.id);

                qb.andWhere('board.id IN (:boardIds)', { boardIds });
            }

            rawRows = await qb.getMany();
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getMore 에러 발생',
                content: 'board로그 확인 요망',
            });
        }

        if (tags) {
            rawRows = rawRows.filter((row) => {
                const rowTags: string[] = row.boardTags.map((boardTag) => boardTag.tag.name);
                const isIncludeAllTag: boolean = tags.every((tag) => rowTags.includes(tag));
                return isIncludeAllTag;
            });
        }
        const rows: Board[] = this.convertBoardToSummaryBoards(rawRows);
        return rows;
    }
    async getAFewBoardOfAllCategory(): Promise<Board[]> {
        try {
            const boardRows: Board[] = await this.boardRepository
                .createQueryBuilder('board')
                .leftJoinAndSelect('board.boardTags', 'boardTag')
                .leftJoinAndSelect('boardTag.tag', 'tag')
                .where('private = false')
                .orderBy('board.date', 'DESC')
                .take(10)
                .getMany();
            const sortedBoardRows: Board[] = this.convertBoardToSummaryBoards(boardRows);
            return sortedBoardRows;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getAFewBoardOfAllCategory 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
    convertBoardToSummaryBoards(rawRows: Board[]): Board[] {
        return rawRows.map((row: Board) => {
            const html = parse(row.content);
            const pTagElement = html.querySelector('p');
            const content: string = pTagElement ? pTagElement.text : html.text;
            return { ...row, content: content };
        });
    }
    async upsertBoard(board: Board, tags: Tag[]): Promise<void> {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const boardTags = await Promise.all(
                tags.map(async (tag: Tag) => {
                    const existTag = await this.tagRepository.findOne({
                        where: { name: tag.name },
                    });
                    return plainToClass(BoardTag, { tag: existTag ? existTag : tag });
                }),
            );
            const boardWithTags: Board = plainToClass(Board, {
                ...board,
                boardTags,
            });

            if (board.id) {
                await this.boardTagRepository
                    .createQueryBuilder()
                    .delete()
                    .where('board_id = :id', { id: board.id })
                    .execute();
            }

            await this.boardRepository.save(boardWithTags);
            await queryRunner.commitTransaction();
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - upsertBoard - 1 에러 발생',
                content: 'board 로그 확인 요망',
            });
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
    async deleteBoard(id: number): Promise<void> {
        const queryRunner = this.connection.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            //image delete
            const { file, content } = await this.boardRepository
                .createQueryBuilder()
                .select(['file', 'content'])
                .where('id= :id', { id })
                .getRawOne();

            const res = await fetch(`https://image.zodaland.com/delete/${file}`, {
                method: 'DELETE',
            });
            if (res.status !== 200) throw new Error('image res status is not 200');
            const isSuccess = await res.text();
            if (!isSuccess) throw new Error('image res is 200 but image delete not success');

            //content images delete
            const html = parse(content);
            const imgElements = html.querySelectorAll('img');
            if (imgElements.length > 0) {
                const imageURLs = imgElements.map((element) => {
                    const src = element.getAttribute('src');
                    const lastIndex = src.lastIndexOf('/');
                    const imageName = src.substr(lastIndex + 1);
                    return imageName;
                });
                await Promise.all(
                    imageURLs.map(async (imageName) => {
                        const res = await fetch(`https://image.zodaland.com/delete/${imageName}`, {
                            method: 'DELETE',
                        });
                        if (res.status !== 200) throw new Error('image res status is not 200');
                        const isSuccess = await res.text();
                        if (!isSuccess)
                            throw new Error('image res is 200 but image delete not success');
                    }),
                );
            }

            //find tag ids
            const tagIdRows = await this.boardTagRepository
                .createQueryBuilder('board_tag')
                .select('tag_id as tagId')
                .where('board_id = :id', { id })
                .getRawMany();
            const tagIds: number[] = tagIdRows.map((tagIdRow) => tagIdRow.tagId);

            //board delete
            await this.boardRepository.delete(id);

            //tag delete
            for (const tagId of tagIds) {
                const { leftTagCount } = await this.boardTagRepository
                    .createQueryBuilder()
                    .select('COUNT(id) as leftTagCount')
                    .where('tag_id = :tagId', { tagId })
                    .getRawOne();
                if (leftTagCount < 1) {
                    await this.tagRepository.delete(tagId);
                }
            }
            await queryRunner.commitTransaction();
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - deleteBoard 에러 발생',
                content: 'board 로그 확인 요망',
            });
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
    async getSummaryBoards(category: string, page: number, offset: number): Promise<Board[]> {
        try {
            const skip: number = (page - 1) * offset;
            const rows: Board[] = await this.boardRepository
                .createQueryBuilder('board')
                .select(['board.id', 'board.title'])
                .where('board.category = :category', { category })
                .orderBy('board.date', 'DESC')
                .skip(skip)
                .take(offset)
                .getMany();
            return rows;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getSummaryBoards 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
    async getCategoryCount(category: string, tags: string[]): Promise<number> {
        try {
            const qb = this.boardRepository
                .createQueryBuilder()
                .select('COUNT(id) as count')
                .where('category = :category', { category })
                .andWhere('private = false');

            if (tags) {
                const boardTagRows = await this.boardTagRepository
                    .createQueryBuilder('boardTag')
                    .select('boardTag.board_id as id')
                    .leftJoin('boardTag.tag', 'tag')
                    .where('tag.name IN (:tags)', { tags })
                    .getRawMany();
                const boardIds = boardTagRows.map((row: BoardTag) => row.id);

                qb.andWhere('id IN (:boardIds)', { boardIds });
            }
            const { count } = await qb.getRawOne();

            return count;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getCategoryCount 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
    async getCategoryCountAll(category: string): Promise<number> {
        try {
            const { count } = await this.boardRepository
                .createQueryBuilder()
                .select('COUNT(id) as count')
                .where('category = :category', { category })
                .getRawOne();
            return count;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getCategoryCountAll 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
    async tempUploadBoardImage(file: Express.Multer.File): Promise<string> {
        try {
            const FormData = require('form-data');
            const formData = new FormData();
            formData.append('file', file.buffer);
            formData.append('name', file.originalname);
            const res = await fetch(this.configService.get('IMAGE_SERVER_URL'), {
                method: 'POST',
                body: formData,
            });
            if (res.status !== 200) throw new Error('image res status is not 200');
            const fileName = await res.text();
            return fileName;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - tempUploadBoardImage 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
    async getBoardForKeyword(keyword: string): Promise<Board[]> {
        try {
            const rows = await this.boardRepository.find();
            const matchedRows = rows.filter((row: Board) => {
                let result = false;
                const innerText = parse(row.content).innerText;
                const filteredContent = innerText.replace(/<[^>]+>|\&lt;|\&gt;/gi, '');
                const filteredContentExist = filteredContent.toLowerCase().includes(keyword);
                const filteredTitleExist = row.title.toLowerCase().includes(keyword);
                const filteredTagExist = row.boardTags.some((boardTag: BoardTag) =>
                    boardTag.tag.name.toLowerCase().includes(keyword),
                );

                if (filteredContentExist || filteredTitleExist || filteredTagExist) {
                    result = true;
                }

                return result;
            });
            const resultRows = this.convertBoardToSummaryBoards(matchedRows);
            return resultRows;
        } catch (e) {
            this.logService.error(e.toString());
            this.mailService.send({
                subject: 'boardService - getBoardForKeyword 에러 발생',
                content: 'board 로그 확인 요망',
            });
        }
    }
}
