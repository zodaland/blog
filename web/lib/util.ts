import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPaths,
    GetStaticPathsContext,
} from 'next';

import moment from 'moment';

import { ErrorWithStatus } from '../interfaces';

export const getDate = (date: string | number) =>
    moment(date, 'YYYYMMDD').format('YYYY년 MM월 DD일');

export const withGetServerSideProps = (
    getServersideProps: GetServerSideProps,
): GetServerSideProps => {
    return async (ctx: GetServerSidePropsContext) => {
        try {
            return await getServersideProps(ctx);
        } catch (error) {
            const status: number | null = error instanceof ErrorWithStatus ? error.status : null;

            if (status === 404) return { notFound: true };
            if (status === 401)
                return {
                    redirect: {
                        destination: (error as ErrorWithStatus).redirect ?? '/',
                        permanent: false,
                    },
                };

            return {
                props: {
                    status: status ?? 500,
                },
            };
        }
    };
};

export const withGetStaticProps = (getStaticProps: GetStaticProps): GetStaticProps => {
    return async (ctx: GetStaticPropsContext) => {
        try {
            return await getStaticProps(ctx);
        } catch (error) {
            const status: number | null = error instanceof ErrorWithStatus ? error.status : null;

            if (status === 404) return { notFound: true };
            if (status === 401)
                return {
                    redirect: {
                        destination: (error as ErrorWithStatus).redirect ?? '/',
                        permanent: false,
                    },
                };

            return {
                props: {
                    status: status ?? 500,
                },
            };
        }
    };
};

export const withGetStaticPaths = (getStaticPaths: GetStaticPaths): GetStaticPaths => {
    return async (ctx: GetStaticPathsContext) => {
        try {
            return await getStaticPaths(ctx);
        } catch (_) {
            return {
                paths: [],
                fallback: true,
            };
        }
    };
};
