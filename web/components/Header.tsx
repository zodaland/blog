import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Search, Menu } from 'react-feather';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { modifyMenu, modifySearch } from '../redux/modules/headerSlice';

import { apiUrl, fetcher } from '../lib/fetch';
import useSWRImmutable from 'swr/immutable';

import { NavigatorProps } from '../interfaces';

const Header = () => {
    const headers = useAppSelector((state) => state.headers);
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('');

    const handleMenu = (e: Event) => {
        if (window.innerWidth > 768) return;
        const target: HTMLElement = e.target as HTMLElement;

        if (target.ariaLabel === 'Navigation') {
            if (!headers.isMenuOn) {
                dispatch(modifyMenu(true));
            } else {
                dispatch(modifyMenu(false));
            }
        } else if (target.ariaLabel === 'Search') {
            dispatch(modifySearch(true));
        } else {
            dispatch(modifyMenu(false));
            dispatch(modifySearch(false));
        }
    };

    useEffect(() => {
        document.addEventListener('touch', handleMenu);
        document.addEventListener('click', handleMenu);

        return () => {
            document.removeEventListener('touch', handleMenu);
            document.removeEventListener('click', handleMenu);
        };
    }, [headers]);

    return (
        <>
            <header>
                <div className="flex items-center">
                    <Link href="/">
                        <a>
                            <div className="p-5 font-bold text-3xl">ZODALAND</div>
                        </a>
                    </Link>
                    <span
                        className={
                            'cursor-pointer p-6 ml-auto md:hidden ' +
                            (headers.isSearchOn ? 'hidden' : '')
                        }
                        aria-label="Search"
                    >
                        <Search className="pointer-events-none w-7 h-7" />
                    </span>
                    <span
                        className={
                            'relative md:block md:ml-auto md:mr-4 ' +
                            (headers.isSearchOn ? 'md:grow-0 grow' : 'hidden')
                        }
                    >
                        <input
                            className="peer placeholder:italic placeholder:text-gray-300 border-b pt-2 pl-9 focus:outline-none text-sm w-full border-black focus:border-sky-300"
                            placeholder="Search"
                            type="text"
                            name="search"
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            aria-label="Search"
                        />
                        <Search
                            className="absolute inset-y-0.5 left-0 flex item-center pl-1 h-6 w-6 peer-focus:text-sky-300"
                            aria-label="Search"
                        />
                    </span>
                    <Navigator isMenuOn={headers.isMenuOn} />
                    <span
                        className={
                            'cursor-pointer p-6 md:hidden ' +
                            (headers.isMenuOn ? ' text-sky-400' : '')
                        }
                        aria-label="Navigation"
                    >
                        <Menu className="pointer-events-none w-7 h-7" />
                    </span>
                </div>
            </header>
        </>
    );
};

const Navigator = ({ isMenuOn }: NavigatorProps) => {
    const { category } = useAppSelector((state) => state.uri);
    const { data } = useSWRImmutable(`${apiUrl}/board/category`, fetcher);

    return (
        <nav className={'md:block z-10' + (!isMenuOn ? ' hidden' : '')}>
            <ul className="flex items-center md:relative absolute md:inset-0 top-16 right-4 md:flex-row flex-col md:mr-5 md:divide-0 md:divide-transparent divide-y divide-white md:rounded-none rounded-xl md:w-auto w-48 text-center menu">
                {data &&
                    data.map((link: string, key: number) => (
                        <Link href={'/' + link} key={key}>
                            <a>
                                <li
                                    className={
                                        'lg:px-5 px-2 md:text-base md:text-xl text-2xl md:py-0 pt-1.5' +
                                        (category && category.includes(link)
                                            ? ' uppercase font-bold text-sky-500'
                                            : '')
                                    }
                                >
                                    {link}
                                </li>
                            </a>
                        </Link>
                    ))}
            </ul>
        </nav>
    );
};

export default Header;
