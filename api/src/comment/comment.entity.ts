import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn({
        type: 'int',
        unsigned: true,
    })
    id: number;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    comment: string;

    @Column({
        type: 'varchar',
        length: 200,
        nullable: false,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 14,
        nullable: false,
    })
    date: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    private: boolean;

    @Column({
        name: 'added_id',
        type: 'int',
        unsigned: true,
        default: null,
    })
    addedId: number;

    @Column({
        name: 'board_id',
        type: 'int',
        unsigned: true,
        nullable: false,
    })
    boardId: number;
}
