/***********************
getCategoryAll
getBoardIdAll
getBoardForKeyword
getCategoryCount
getOne
getMore
getAFewBoardOfAllCategory
getCategoryCountAll
setBoard
deleteBoard
getAllBoard
tempUploadBoardImage
***********************/
import { Test } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

jest.mock('./board.service');

describe('BoardController', () => {
    let controller: BoardController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [BoardController],
            providers: [BoardService],
        }).compile();
        controller = moduleRef.get<BoardController>(BoardController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getCategoryAll', () => {
        it.todo('should be defined');
    });
    describe('getBoardIdAll', () => {
        it.todo('should be defined');
    });
    describe('getBoardForKeyword', () => {
        it.todo('should be defined');
    });
    describe('getCategoryCount', () => {
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
    describe('getCategoryCountAll', () => {
        it.todo('should be defined');
    });
    describe('setBoard', () => {
        it.todo('should be defined');
    });
    describe('deleteBoard', () => {
        it.todo('should be defined');
    });
    describe('getAllBoard', () => {
        it.todo('should be defined');
    });
    describe('tempUploadBoardImage', () => {
        it.todo('should be defined');
    });
});
