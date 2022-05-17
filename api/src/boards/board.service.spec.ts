import { Test } from '@nestjs/testing';
import { BoardModule } from './board.module';
import { BoardService } from './board.service';

describe('BoardService', () => {
    let boardService: BoardService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [ BoardModule ],
        }).compile();

        boardService = moduleRef.get<BoardService>(BoardService);
    });

    describe('getCategoryAll', () => {
        it('should be defined', () => {
            expect(boardService.getCategoryAll).toBeDefined();   
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