import Head from 'next/head';

import Layout from '../components/Layout';
import Main from '../components/Main';
import Error from '../components/Error';

import { fetcher } from '../lib/fetcher';
import { withGetStaticProps } from '../lib/util';

import { MainProps } from '../interfaces';

import { parse } from 'node-html-parser';

const IndexPage = ({ status, intro, boards }: MainProps) => {
    if (status) return <Error status={status} />;

    const description: string = parse(intro.introduce).innerText;
    return (
        <>
            <Head>
                <meta name="description" content={description} />
                <meta property="og:description" content={process.env.NEXT_PUBLIC_TITLE} />
            </Head>
            <Layout>
                <Main boards={boards} intro={intro} />
            </Layout>
        </>
    );
};

export const getStaticProps = withGetStaticProps(async () => {
    const boards = await fetcher('/board');
    const intro = await fetcher('/intro');

    return {
        props: {
            boards,
            intro,
        },
        revalidate: 10,
    };
});

export default IndexPage;
