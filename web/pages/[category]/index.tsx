import { GetServerSidePropsContext } from 'next';

import { ParsedUrlQuery } from 'querystring';

import Head from 'next/head';
import Layout from '../../components/Layout';
import Category from '../../components/Category';
import Error from '../../components/Error';

import { fetcher } from '../../lib/fetcher';
import { withGetServerSideProps } from '../../lib/util';
import { SWRConfig } from 'swr';

import { CategoryIndexProps } from '../../interfaces';

const CategoryIndexPage = ({ category, status, fallback, page, offset }: CategoryIndexProps) => {
    if (status) return <Error status={status} />;

    const title =
        category.substr(0, 1).toUpperCase() +
        category.substr(1) +
        ' | ' +
        process.env.NEXT_PUBLIC_TITLE;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:description" content={title} />
                <meta name="description" content={title} />
            </Head>
            <Layout>
                <SWRConfig
                    value={{
                        fallback,
                    }}
                >
                    <Category page={page} offset={offset} />
                </SWRConfig>
            </Layout>
        </>
    );
};

export const getServerSideProps = withGetServerSideProps(
    async (context: GetServerSidePropsContext) => {
        if (!context.params) return { props: { status: 404 } };
        const { category } = context.params as ParsedUrlQuery;
        const page = context.query.page ?? 1;
        const offset = context.query.offset ?? 10;
        const url = `/board/${category}/page/${page}/offset/${offset}`;
        const preFetchData = await fetcher(url);
        return {
            props: {
                category: category,
                fallback: {
                    [url]: preFetchData,
                },
                page: page ?? 1,
                offset: offset ?? 10,
            },
        };
    },
);

export default CategoryIndexPage;
