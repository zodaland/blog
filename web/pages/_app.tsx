import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/global.css';
import wrapper from '../redux';

import { useAppDispatch } from '../redux/hooks';
import { setPath } from '../redux/modules/uriSlice';

const App = ({ Component, pageProps }: AppProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setPath(router.query));
    }, [router.query]);

    const queryPartIndex = router.asPath.indexOf('?');
    const path = queryPartIndex !== -1 ? router.asPath.substr(0, queryPartIndex) : router.asPath;
    const ogUrl =
        process.env.NODE_ENV == 'production'
            ? 'https://www.zodaland.com' + path
            : 'https://blog.test.zodaland.com' + path;
    const ogImage = `${process.env.NEXT_PUBLIC_IMAGE_URL}og_profile.jpg`;

    return (
        <>
            <Head>
                <title>{process.env.NEXT_PUBLIC_TITLE}</title>
                <meta property="og:title" content="ZODALAND" />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:image" content={ogImage} />
                <link rel="canonical" href={ogUrl} />
            </Head>
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(App);
