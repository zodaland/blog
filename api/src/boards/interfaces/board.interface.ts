import { IBoardTag } from './board_tag.interface';
export interface IBoard {
    id: number;
    category: string;
    title: string;
    content: string;
    date: string;
    boardTags: IBoardTag[];
}