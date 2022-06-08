import { ReactNode } from 'react';
import { KeyedMutator } from 'swr';

import { IBoard, ITag } from './board';
import { IIntro } from './intro';
import { IPageOption } from './page';

export interface ClassProps {
    className?: string;
}
export interface ContentsProps extends ClassProps {
    data: IBoard[];
}
export interface ImageProps extends ClassProps {
    file: string;
}
export interface MarkdownProps extends ClassProps {
    html: string;
}

export interface CategoryIndexProps extends PagingProps {
    category: string;
    fallback: any;
}

export interface PagingProps extends StatusProps {
    page: number;
    offset: number
}

export interface MainProps extends StatusProps {
    boards: IBoard[];
    intro: IIntro;
}

export interface BulletinProps extends PageOptionProps {
    data: IBoard[];
}

export interface BoardsProps {
    data: IBoard[];
}

export interface PageOptionProps {
    pageOption: IPageOption;
    handlePage: (n: number) => void;
}

export interface StatusProps {
    status?: number;
}

export interface ServerSideBoardProps extends StatusProps {
    board?: IBoard;
}

export interface EditorProps {
    id: number;
    setHtml: (html: string) => void;
    html: string;
}

export interface SubBoardProps {
    category: string;
    categories: string[];
    handleClick: (id: number) => void;
}

export interface SubMenuProps {
    menu: string;
    setMenu: (value: string) => void;
}

export interface ReCaptchaProps {
    handleVerify: (value: boolean) => void;
}

export interface NavigatorProps {
    isMenuOn: boolean;
}

export interface ChaserProps extends ChildrenProps {
    subject: string;
    className: string;
}

export interface ChildrenProps {
    children: ReactNode;
}

export interface SearchProps {
    text: string;
}

export interface CommentProps {
    id: number | undefined;
}

export interface CommentEditProps {
    id: number | undefined;
    mutate: KeyedMutator<any>;
}