export interface IPageOption {
    pages: number[];
    page: number;
    prev: boolean;
    next: boolean;
    total: number;
    boundary: number;
}