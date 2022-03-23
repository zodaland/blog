import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import Detail from '../../components/Category/Detail';
import Error from '../../components/Error';

import { fetcher } from '../../lib/fetcher';
import { withGetStaticProps, withGetStaticPaths } from '../../lib/util';

import { ServerSideBoardProps, IBoardSummary } from '../../interfaces';

import { parse, HTMLElement } from 'node-html-parser';

const DetailPage = ({ status, board }: ServerSideBoardProps) => {
    if (status) return <Error status={status} />;

    const router = useRouter();
    if (router.isFallback || !board) return <Loading className="w-full h-screen" />;

    const title = board.title + ' | 캥미뭉의 조다랜드';
    const pTagElement: HTMLElement | null = parse(board.content).querySelector('p');
    const description = pTagElement ? pTagElement.innerText : '';
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:description" content={description} />
                <meta name="description" content={description} />
            </Head>
            <Layout>
                <Detail board={board} />
            </Layout>
        </>
    );
};

export const getStaticPaths = withGetStaticPaths(async () => {
    const boards = await fetcher('/board/posts');
    const paths = boards.map((board: IBoardSummary) => ({
        params: {
            id: board.id.toString(),
            category: board.category,
        },
    }));
    return {
        paths,
        fallback: true,
    };
});
export const getStaticProps = withGetStaticProps(async ({ params }: GetStaticPropsContext) => {
    const { category, id } = params as ParsedUrlQuery;
    const board = await fetcher(`/board/${category}/${id}`);

    return {
        props: { board },
        revalidate: 10,
    };
});

export default DetailPage;
