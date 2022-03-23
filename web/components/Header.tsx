import { useState, useEffect, ChangeEvent } from 'react';

import Link from 'next/link';
import Loading from './Loading';

import { Search, Menu } from 'react-feather';
import { ShortBulletinBoard } from './Bulletin';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { modifyMenu, modifySearch } from '../redux/modules/headerSlice';

import { fetcher } from '../lib/fetcher';
import useSWRImmutable from 'swr/immutable';
import useSWR from 'swr';

import { NavigatorProps, SearchProps } from '../interfaces';

const Header = () => {
    const headers = useAppSelector((state) => state.headers);
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regEx = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ. ]*$/;
        if (!regEx.test(value)) return;
        setText(value);
    };

    useEffect(() => {
        const handleMenu = (e: Event) => {
            const target: HTMLElement = e.target as HTMLElement;

            if (target.ariaLabel !== 'Search') {
                setText('');
            }
            if (window.innerWidth > 768) return;

            if (target.ariaLabel === 'Navigation') {
                if (!headers.isMenuOn) {
                    dispatch(modifyMenu(true));
                } else {
                    dispatch(modifyMenu(false));
                }
            } else if (target.ariaLabel === 'Search') {
                dispatch(modifySearch(true));
            } else {
                setText('');
                dispatch(modifySearch(false));
                dispatch(modifyMenu(false));
            }
        };

        document.addEventListener('touch', handleMenu);
        document.addEventListener('click', handleMenu);

        return () => {
            document.removeEventListener('touch', handleMenu);
            document.removeEventListener('click', handleMenu);
        };
    }, [headers, text]);

    return (
        <>
            <header className={text && 'w-full fixed z-30'}>
                <div className="flex items-center">
                    {text && <SearchComponent text={text} />}
                    <Link href="/">
                        <a className="z-30">
                            <div className="p-5 font-bold text-3xl text-shadow">ZODALAND</div>
                        </a>
                    </Link>
                    <span
                        className={
                            'cursor-pointer p-6 ml-auto md:hidden z-30' +
                            (headers.isSearchOn ? ' hidden' : '')
                        }
                        aria-label="Search"
                    >
                        <Search className="pointer-events-none w-7 h-7" />
                    </span>
                    <span
                        className={
                            'relative md:block md:ml-auto md:mr-4 z-30' +
                            (headers.isSearchOn ? ' md:grow-0 grow' : ' hidden')
                        }
                    >
                        <input
                            className="bg-transparent text-shadow peer placeholder:italic placeholder:text-gray-300 border-b pt-2 pl-9 focus:outline-none text-sm w-full border-black focus:border-sky-300"
                            placeholder="Search"
                            type="text"
                            name="search"
                            onChange={handleChange}
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
                            'cursor-pointer p-6 md:hidden z-30' +
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
    const { data } = useSWRImmutable(`/board/category`, fetcher);

    return (
        <nav className={'md:block z-30' + (!isMenuOn ? ' hidden' : '')}>
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

const SearchComponent = ({ text }: SearchProps) => {
    const isWord = !/[ㄱ-ㅎ]+/.test(text);
    const { data, error } = useSWR(isWord ? `/board/search?keyword=${text}` : null, fetcher, {
        onErrorRetry: (error) => {
            if (error.status === 400) return;
        },
    });

    return (
        <div className="search-modal flex place-content-center backdrop-blur-sm md:px-0 px-5">
            <div className="main h-full bg-white rounded-xl p-5 overflow-y-auto">
                {(() => {
                    if (error || !data) {
                        return <Loading />;
                    } else if (data.length < 1) {
                        return <SearchEmptyComponent text={text} />;
                    } else {
                        return <ShortBulletinBoard data={data} />;
                    }
                })()}
            </div>
        </div>
    );
};

const SearchEmptyComponent = ({ text }: SearchProps) => {
    return (
        <div className="text-center font-xl mt-20">
            "<span className="text-sky-300">{text}</span>" 에 대한 결과가 없습니다.
        </div>
    );
};

export default Header;
