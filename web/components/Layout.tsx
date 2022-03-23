import { useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from './Header';
import Footer from './Footer';

import { useAppDispatch } from '../redux/hooks';
import { setScrollY } from '../redux/modules/scrollSlice';

import { ChildrenProps } from '../interfaces';

const Layout = ({ children }: ChildrenProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleScroll = () =>
            window.requestAnimationFrame(() => dispatch(setScrollY(window.scrollY)));
        window.addEventListener('scroll', handleScroll);

        const handleError = (e: ErrorEvent) => {
            const path = document.location.pathname;
            const reason = btoa(e.error.stack);
            router.replace({
                pathname: '/error',
                query: { path, reason },
            });
            e.preventDefault();
        };
        window.addEventListener('error', handleError);

        const handleRejectError = (e: PromiseRejectionEvent) => {
            const path = document.location.pathname;
            const reason = btoa(e.reason.stack);
            router.replace({
                pathname: '/error',
                query: { path, reason },
            });
            e.preventDefault();
        };
        window.addEventListener('unhandledrejection', handleRejectError);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleRejectError);
        };
    }, []);
    return (
        <>
            <Header />
            <main>
                <div className="flex flex-wrap items-start justify-center md:px-0 px-4">
                    {children}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Layout;
