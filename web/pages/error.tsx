import { GetServerSidePropsContext } from 'next';

import Error from '../components/Error';

import { withGetServerSideProps } from '../lib/util';
import { writeLog } from '../lib/log';

const CustomErrorPage = () => <Error status={400} />;

export const getServerSideProps = withGetServerSideProps(
    async ({ query }: GetServerSidePropsContext) => {
        if (typeof query.path === 'string') writeLog('error', query.path);
        if (typeof query.reason === 'string') writeLog('error', atob(query.reason));
        return {
            props: {},
        };
    },
);

export default CustomErrorPage;
