import { Test } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto';
import { Repository } from 'typeorm/repository/Repository';

jest.mock('typeorm/repository/Repository');

describe('CommentService', () => {
    let service: CommentService;
    let repo: Repository<Comment>;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                CommentService,
                {
                    provide: getRepositoryToken(Comment),
                    useClass: Repository,
                },
            ],
        }).compile();
        service = moduleRef.get<CommentService>(CommentService);
        repo = moduleRef.get<Repository<Comment>>(getRepositoryToken(Comment));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findAllByBoardId', () => {
        it('should be defined', () => {
            expect(service.findAllByBoardId).toBeDefined();
        });
        it('should return <Comment[]> type array', async () => {
            const mockData: Comment[] = [];
            jest.spyOn(repo, 'find').mockResolvedValue(mockData);

            const result = await service.findAllByBoardId(1);

            expect(repo.find).toBeCalled();
            expect(result).toEqual(mockData);
        });
    });

    describe('save', () => {
        const comment: CommentDto = {
            id: 1,
            name: 'test',
            password: '123',
            date: '20220525151034',
            comment: '',
            private: false,
            boardId: 1,
        };

        it('should be defined', () => {
            expect(service.save).toBeDefined();
        });
        it('should be called repo.save', async () => {
            jest.spyOn(repo, 'save').mockResolvedValue(null);

            await service.save(comment);

            expect(repo.save).toBeCalled();
        });
    });

    describe('delete', () => {
        const mockData: Comment = {
            id: 1,
            //123 hash
            password: '$2b$10$j4SDmEqLG1jLcAxWMbfiVeCkvdMfuWi4Ve5vLpp5r5P/Dg7mhdYte',
            name: 'test',
            date: '20220525145113',
            comment: '',
            private: false,
            boardId: 1,
        };
        const password = '123';

        it('should be defined', () => {
            expect(service.delete).toBeDefined();
        });
        it('should return 404', async () => {
            jest.spyOn(repo, 'delete').mockResolvedValue(null);
            jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

            const result = await service.delete(1, '');

            expect(repo.delete).toHaveBeenCalledTimes(0);
            expect(repo.findOne).toBeCalled();
            expect(result).toHaveProperty('status', 404);
        });
        it('should return 401', async () => {
            jest.spyOn(repo, 'delete').mockResolvedValue(null);
            jest.spyOn(repo, 'findOne').mockResolvedValue(mockData);

            const result = await service.delete(mockData.id, '');

            expect(repo.delete).toHaveBeenCalledTimes(0);
            expect(repo.findOne).toBeCalled();
            expect(result).toHaveProperty('status', 401);
        });
        it('should return 200', async () => {
            jest.spyOn(repo, 'delete').mockResolvedValue(null);
            jest.spyOn(repo, 'findOne').mockResolvedValue(mockData);

            const result = await service.delete(mockData.id, password);

            expect(repo.delete).toBeCalled();
            expect(repo.findOne).toBeCalled();
            expect(result).toHaveProperty('status', 200);
        });
    });
});
