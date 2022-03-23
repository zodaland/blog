import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';

import Layout from '../../components/Layout';
import Admin from '../../components/Admin';
import Login from '../../components/Admin/Login';

import { withGetServerSideProps } from '../../lib/util';

import { useAppSelector } from '../../redux/hooks';

const Index = () => {
    const token = useAppSelector((state) => state.token);
    return (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Layout>{token ? <Admin /> : <Login />}</Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = withGetServerSideProps(
    async (context: GetServerSidePropsContext) => {
        //otp validation

        if (!context.params) return { notFound: true };
        const { code } = context.params;

        const res = await fetch(`${process.env.OTP_URL}/${code}`);
        if (res.status !== 200) return { notFound: true };

        return {
            props: {},
        };
    },
);

export default Index;
