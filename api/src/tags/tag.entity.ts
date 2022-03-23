import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardTag } from '../boards/board_tag.entity';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true,
    })
    name: string;

    @OneToMany(type => BoardTag, boardTag => boardTag.tag, { onDelete: 'CASCADE', orphanedRowAction: 'delete' })
    boardTags: BoardTag[];
}