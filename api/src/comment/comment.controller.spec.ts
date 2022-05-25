import {
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { CommentDto } from './dto';

jest.mock('./comment.service');

describe('CommentController', () => {
    let controller: CommentController;
    let service: CommentService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CommentController],
            providers: [CommentService],
        }).compile();

        controller = moduleRef.get<CommentController>(CommentController);
        service = moduleRef.get<CommentService>(CommentService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findAllByBoardId', () => {
        it('should be defined', () => {
            expect(controller.findAllByBoardId).toBeDefined();
        });
        it('should return Comment array', async () => {
            const mockData: Comment[] = [];
            jest.spyOn(service, 'findAllByBoardId').mockReturnValue(Promise.resolve(mockData));

            const result = await controller.findAllByBoardId(1);
            expect(service.findAllByBoardId).toBeCalled();
            expect(result).toEqual(mockData);
        });
        it('should throw InternalServerErrorException', async () => {
            jest.spyOn(service, 'findAllByBoardId').mockRejectedValue(null);

            await expect(async () => {
                await controller.findAllByBoardId(1);
            }).rejects.toThrowError(new InternalServerErrorException());
        });
    });

    describe('save', () => {
        const commentDto: CommentDto = {
            id: 1,
            name: 'test',
            password: '123',
            date: '20220525151034',
            comment: '',
            private: false,
            boardId: 1,
        };

        it('should be defined', () => {
            expect(controller.save).toBeDefined();
        });
        it('should return true', async () => {
            jest.spyOn(service, 'save').mockResolvedValue(null);

            const result = await controller.save(commentDto);
            expect(result).toBeTruthy();
        });
        it('should throw InternalServerErrorException', async () => {
            jest.spyOn(service, 'save').mockRejectedValue(null);

            await expect(async () => {
                await controller.save(commentDto);
            }).rejects.toThrowError(new InternalServerErrorException());
        });
    });

    describe('delete', () => {
        it('should be defined', () => {
            expect(controller.delete).toBeDefined();
        });
        it('should throw NotFoundException', async () => {
            jest.spyOn(service, 'delete').mockResolvedValue({ status: 404 });

            await expect(async () => {
                await controller.delete(1, '');
            }).rejects.toThrowError(new NotFoundException());
        });
        it('should throw UnauthorizedException', async () => {
            jest.spyOn(service, 'delete').mockResolvedValue({ status: 401 });

            await expect(async () => {
                await controller.delete(1, '');
            }).rejects.toThrowError(new UnauthorizedException());
        });
        it('should throw InternalServerErrorException', async () => {
            jest.spyOn(service, 'delete').mockRejectedValue(null);

            await expect(async () => {
                await controller.delete(1, '');
            }).rejects.toThrowError(new InternalServerErrorException());
        });
        it('should return true', async () => {
            jest.spyOn(service, 'delete').mockResolvedValue({ status: 200 });

            const result = await controller.delete(1, '');
            expect(result).toBeTruthy();
        });
    });
});
