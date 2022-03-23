import { useEffect, useState } from 'react';

import Chaser from '../Chaser';

import { fetcher } from '../../lib/fetcher';

import { useAppSelector } from '../../redux/hooks';

import { SubBoardProps, IBoard, IPageOption } from '../../interfaces';

const SubBoardComponent = ({ category, categories, handleClick }: SubBoardProps) => {
    const token = useAppSelector((state) => state.token);

    const [pageOption, setPageOption] = useState<IPageOption>({
        pages: [],
        page: 0,
        prev: false,
        next: false,
        total: 0,
        boundary: 5,
    });
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [id, setId] = useState<number>(0);

    const handleId = (boardId: number) => {
        if (id === boardId) {
            setId(0);
        } else {
            setId(boardId);
        }
        handleClick(boardId);
    };

    const offset = 5;

    //카테고리 변경시 새로운 카테고리 게시물을 읽어오거나 모두 지운다.
    useEffect(() => {
        if (!categories.includes(category)) {
            setBoards([]);
            setPageOption({
                ...pageOption,
                page: 0,
                pages: [],
                prev: false,
                next: false,
                total: 0,
            });
            return;
        }

        const createNewSubBoard = async () => {
            try {
                const { count } = await fetcher(`/board/${category}/count/all`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const total = Math.ceil(count / offset);
                const fetchBoards = await fetcher(
                    `/board/summary/${category}/page/1/offset/${offset}`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setPageOption({ ...pageOption, total });
                setBoards(fetchBoards);
            } catch (error) {}
        };
        createNewSubBoard();
        setId(0);
    }, [category]);

    //페이지 변경
    const handlePage = (n: number) => {
        const pageCount: number = Math.floor((n - 1) / pageOption.boundary);
        const pagesFirst: number = pageCount * pageOption.boundary;
        const pagesLast: number = pagesFirst + pageOption.boundary;
        const isExistPrev: boolean = pagesFirst > 0 ? true : false;
        const isExistNext: boolean = pagesLast + 1 <= pageOption.total ? true : false;
        const pages = Array.from(
            {
                length:
                    pagesLast <= pageOption.total
                        ? pageOption.boundary
                        : pageOption.total - pagesFirst,
            },
            (v, i) => i + 1 + pagesFirst,
        );
        setPageOption({
            ...pageOption,
            pages,
            page: n,
            prev: isExistPrev,
            next: isExistNext,
        });
    };
    useEffect(() => {
        handlePage(1);
    }, [pageOption.total]);

    //페이지가 변경되면 해당 페이지 게시글을 읽어온다.
    useEffect(() => {
        if (!categories.includes(category) || pageOption.page === 0) {
            return;
        }
        const setFetchBoards = async () => {
            try {
                const fetchBoards = await fetcher(
                    `/board/summary/${category}/page/${pageOption.page}/offset/${offset}`,
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                setBoards(fetchBoards);
            } catch (error) {}
        };
        setFetchBoards();
    }, [pageOption.page]);

    return (
        <Chaser className="sub xl:block hidden" subject="Contents">
            <ul className="space-y-2 text-center">
                {boards &&
                    boards.map((board, key) => (
                        <li
                            className="text-xs font-thin tracking-tighter"
                            onClick={() => handleId(board.id as number)}
                            key={key}
                        >
                            <div className="flex justify-center space-x-1">
                                <span
                                    className={
                                        'cursor-pointer duration-150 ' +
                                        (board.id === id ? 'text-sky-500 font-bold' : '')
                                    }
                                >
                                    {board.title}
                                </span>
                            </div>
                        </li>
                    ))}
                <div className="flex justify-center">
                    {pageOption.prev && (
                        <span
                            className="mt-6 px-2 cursor-pointer"
                            onClick={() => handlePage(pageOption.pages[0] - 1)}
                        >
                            ＜
                        </span>
                    )}
                    {pageOption.pages &&
                        pageOption.pages.map((n, key) => (
                            <span
                                className={
                                    'mt-6 px-2 ' +
                                    (pageOption.page != n ? 'cursor-pointer' : 'font-bold')
                                }
                                key={key}
                                onClick={() => handlePage(n)}
                            >
                                {n}
                            </span>
                        ))}
                    {pageOption.next && (
                        <span
                            className="mt-6 px-2 cursor-pointer"
                            onClick={() =>
                                handlePage(pageOption.pages[pageOption.boundary - 1] + 1)
                            }
                        >
                            ＞
                        </span>
                    )}
                </div>
            </ul>
        </Chaser>
    );
};

export default SubBoardComponent;
