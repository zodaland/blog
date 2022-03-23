import Head from 'next/head';
import Layout from './Layout';

import { StatusProps } from '../interfaces';

const Error = ({ status }: StatusProps) => {
    const message: string = (() => {
        switch (status) {
            case 404:
                return '요청하신 페이지를 찾을 수 없습니다.';
            case 400:
                return '유효하지 않은 요청입니다.';
            default:
                return '죄송합니다. 잠시 후 다시 시도해주세요.';
        }
    })();
    return (
        <>
            <Head>
                <meta name="robots" content="none" />
            </Head>
            <Layout>
                <section className="main text-center text-xl mt-16">{message}</section>
            </Layout>
        </>
    );
};

export default Error;
