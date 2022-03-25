import { useState, useEffect, useCallback } from 'react';

import Bulletin from '../Bulletin';
import Contents from '../Contents';
import Tags from '../Tags';

import { useAppSelector } from '../../redux/hooks';

import { fetcher } from '../../lib/fetcher';
import useSWR, { useSWRConfig } from 'swr';

import { PagingProps, IPageOption } from '../../interfaces';

const CategoryIndex = ({ page, offset }: PagingProps) => {
    const { category, tags } = useAppSelector((state) => state.uri);

    //paging
    const [pageOption, setPageOption] = useState<IPageOption>({
        pages: [],
        page: page,
        prev: false,
        next: false,
        total: 0,
        boundary: 5,
    });

    const handlePage = useCallback(
        (n: number) => {
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
                page: n,
                pages,
                prev: isExistPrev,
                next: isExistNext,
            });
        },
        [pageOption.total],
    );

    useEffect(() => {
        if (!category) return;
        const initiatePage = async () => {
            try {
                const { count } = await fetcher(
                    `/board/${category}/count${
                        tags.length > 0 ? '?tags=' + encodeURI(JSON.stringify(tags)) : ''
                    }`,
                );
                setPageOption({
                    ...pageOption,
                    total: Math.ceil(count / offset),
                });
            } catch (error) {}
        };
        initiatePage();
    }, [category, tags]);

    useEffect(() => {
        handlePage(1);
    }, [pageOption.total]);

    //swr
    const { fallback } = useSWRConfig();
    const url = `/board/${category}/page/${pageOption.page ?? page}/offset/${offset}`;
    const fallbackData = !tags && pageOption.page === page ? fallback : undefined;
    const { data } = useSWR(
        category
            ? `${url}${tags.length > 0 ? '?tags=' + encodeURI(JSON.stringify(tags)) : ''}`
            : null,
        fetcher,
        { fallbackData },
    );

    return (
        <>
            <Tags />
            <section className="main">
                <Bulletin data={data} pageOption={pageOption} handlePage={handlePage} />
            </section>
            <Contents />
        </>
    );
};

export default CategoryIndex;
