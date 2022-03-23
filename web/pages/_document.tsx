import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="keywords" content="캥미뭉,조다랜드,zodaland" />
                    <link
                        rel="shortcut icon"
                        type="image/x-icon"
                        href="https://image.zodaland.com/view/favicon.ico"
                    />
                    <link
                        rel="icon"
                        type="image/x-icon"
                        href="https://image.zodaland.com/view/favicon.ico"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
