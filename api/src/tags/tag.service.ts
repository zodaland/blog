import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { InputTag } from './dto';
import { Board } from '../boards/board.entity';

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
        @InjectRepository(Board) private boardRepository: Repository<Board>,
    ) {}
    async getCategoryTags(category: string): Promise<string[]> {
        const boardIdRows: Board[] = await this.boardRepository
            .createQueryBuilder('board')
            .select('board.id')
            .where('category = :category', { category })
            .getMany();
        const boardIds: number[] = boardIdRows.map((row: Board) => row.id);

        const tagRows: Tag[] = await this.tagRepository
            .createQueryBuilder('tag')
            .select('distinct name')
            .leftJoin('tag.boardTags', 'boardTag')
            .where('boardTag.board_id IN (:...ids)', { ids: [...boardIds] })
            .getRawMany();
        const tags: string[] = tagRows.map((row: Tag) => row.name);
        return tags;
    }
    async getTagAll(): Promise<string[]> {
        const tagRows: Tag[] = await this.tagRepository
            .createQueryBuilder('tag')
            .select('name')
            .getRawMany();
        const tags: string[] = tagRows.map((row: Tag) => row.name);
        return tags;
    }
    async setTag(tag: InputTag): Promise<boolean> {
        try {
            await this.tagRepository.save(tag);
            return true;
        } catch {
            return false;
        }
    }
}
