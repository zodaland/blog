import { GetServerSidePropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import { fetcher } from '../lib/fetcher';

import { IBoardSummary } from '../interfaces';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const boards = await fetcher('/board/posts');
    const categories = await fetcher('/board/category');

    const lastmod = new Date().toISOString();

    const defaultFields = [
        {
            loc: process.env.URL,
            changefreq: 'daily',
            priority: '0.8',
            lastmod,
        },
        {
            loc: `${process.env.URL}/mail`,
            changefreq: 'daily',
            priority: '0.8',
            lastmod,
        },
    ];

    const categoryFields = categories.map((category: string) => ({
        loc: `${process.env.URL}/${category}`,
        changefreq: 'daily',
        priority: '0.9',
        lastmod,
    }));

    const boardFields = boards.map((board: IBoardSummary) => ({
        loc: `${process.env.URL}/${board.category}/${board.id}`,
        changefreq: 'daily',
        priority: '1.0',
        lastmod,
    }));

    const fields = [...defaultFields, ...categoryFields, ...boardFields];

    return getServerSideSitemap(ctx, fields);
};

export default () => {
    return;
};
