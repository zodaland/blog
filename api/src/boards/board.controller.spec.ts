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
import { BoardModule } from './board.module';
import { BoardController } from './board.controller';

describe('BoardController', () => {
    let boardController: BoardController;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [BoardModule],
        }).compile();
        boardController = moduleRef.get<BoardController>(BoardController);
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