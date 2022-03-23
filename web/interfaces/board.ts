export interface IBoard {
    id?: number;
    boardTags?: IBoardTag[];
    title: string;
    content: string;
    date: string;
    file?: string;
    category: string;
    private: boolean;
}

export interface IBoardTag {
    id: number;
    tag: ITag;
}

export interface ITag {
    id?: number;
    name: string;
}

export interface IBoardSummary {
    id: number;
    category: string;
}