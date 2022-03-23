import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from './board.entity';
import { Tag } from '../tags/tag.entity';

@Entity({ name: 'board_tag' })
export class BoardTag {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @ManyToOne(type => Board, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'board_id', referencedColumnName: 'id'})
    board: Board;

    //cascade : tag is created if boardTag has created
    @ManyToOne(type => Tag, { eager: true, cascade: true })
    @JoinColumn({ name: 'tag_id', referencedColumnName: 'id'})
    tag: Tag;
}