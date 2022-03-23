import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { BoardTag } from './board_tag.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 10,
        nullable: false,
    })
    category: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    title: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    content: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    file: string;

    @Column({
        type: 'varchar',
        length: 8,
        nullable: false,
    })
    date: string;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    private: boolean;

    @OneToMany(type => BoardTag, boardTag => boardTag.board, { eager: true, cascade: true })
    @JoinColumn({ name: 'id', referencedColumnName: 'boardId'})
    boardTags: BoardTag[]
}
