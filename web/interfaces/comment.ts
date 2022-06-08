export interface Comment {
    id?: number;
    name: string;
    comment: string;
    password: string;
    private: boolean;
    date: string;
    boardId: number | undefined;
};

export interface InputComment {
    name: string;
    comment: string;
    password: string;
    private: boolean;
}