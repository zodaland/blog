import { Test } from '@nestjs/testing';
import { BoardService } from './board.service';
import { MailService } from '../mail/mail.service';
import { LogService } from '../log/log.service';
import { ConfigService } from '@nestjs/config';
import { Board } from './board.entity';
import { BoardTag } from './board_tag.entity';
import { Tag } from '../tags/tag.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Connection } from 'typeorm/connection/Connection';

jest.mock('../mail/mail.service');
jest.mock('../log/log.service');
jest.mock('@nestjs/config');
jest.mock('typeorm/repository/Repository');
jest.mock('typeorm/connection/Connection');

describe('BoardService', () => {
    let service: BoardService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                BoardService,
                MailService,
                LogService,
                ConfigService,
                {
                    provide: getRepositoryToken(Board),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(BoardTag),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Tag),
                    useClass: Repository,
                },
                {
                    provide: Connection,
                    useClass: Connection,
                },
            ],
        }).compile();

        service = moduleRef.get<BoardService>(BoardService);
    });

    describe('getCategoryAll', () => {
        it('should be defined', () => {
            expect(service.getCategoryAll).toBeDefined();
        });
    });

    describe('getBoardIdAll', () => {
        it.todo('should be defined');
    });

    describe('getBoardIdAllByCategory', () => {
        it.todo('should be defined');
    });

    describe('getOne', () => {
        it.todo('should be defined');
    });

    describe('getMore', () => {
        it.todo('should be defined');
    });

    describe('getAFewBoardOfAllCategory', () => {
        it.todo('should be defined');
    });

    describe('convertBoardToSummaryBoards', () => {
        it.todo('should be defined');
    });

    describe('upsertBoard', () => {
        it.todo('should be defined');
    });

    describe('deleteBoard', () => {
        it.todo('should be defined');
    });

    describe('getSummaryBoards', () => {
        it.todo('should be defined');
    });

    describe('getCategoryCount', () => {
        it.todo('should be defined');
    });

    describe('getCategoryCountAll', () => {
        it.todo('should be defined');
    });

    describe('tempUploadBoardImage', () => {
        it.todo('should be defined');
    });

    describe('getBoardForKeyword', () => {
        it.todo('should be defined');
    });
});
