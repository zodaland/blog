import Head from 'next/head';

import Layout from '../components/Layout';
import Mail from '../components/Mail';

const MailPage = () => {
    const title = 'Email | ' + process.env.NEXT_PUBLIC_TITLE;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={title} />
                <meta property="og:description" content={title} />
            </Head>
            <Layout>
                <Mail />
            </Layout>
        </>
    );
};

export default MailPage;
