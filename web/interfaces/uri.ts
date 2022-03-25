export interface IUri {
    category: string|undefined;
    id: string|undefined;
}

export interface IUriWithTags extends IUri {
    tags: string[];
}