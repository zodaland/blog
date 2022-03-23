import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';

import { withGetServerSideProps } from '../../lib/util';

import { ErrorWithStatus } from '../../interfaces';

const Board = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Layout>test</Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withGetServerSideProps(
    async ({ req }: GetServerSidePropsContext) => {
        const { authorization } = req.headers;
        if (!authorization) {
            const error = new ErrorWithStatus();
            error.status = 401;
            error.redirect = 'superzodaland';
            throw error;
        }
        return {
            props: {},
        };
    },
);

export default Board;
