import { useEffect } from 'react';

import Chaser from './Chaser';

import { ClassProps } from '../interfaces';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setContents } from '../redux/modules/contentsSlice';
import { setFocus } from '../redux/modules/contentsSlice';

const Contents = ({ className }: ClassProps) => {
    const query = useAppSelector((state) => state.uri);
    const contents = useAppSelector((state) => state.contents.data);
    const scrollY = useAppSelector((state) => state.scrollY);
    const focus = useAppSelector((state) => state.contents.focus);
    const dispatch = useAppDispatch();

    const handleClick = (key: number) => {
        const offsetTop = document.querySelectorAll('h1')[key].offsetTop - 30;
        window.scroll(0, offsetTop);
        dispatch(setFocus(key));
    };

    useEffect(() => {
        const h1Elements = document.getElementsByTagName('h1');
        const contentsData: string[] = Array.from(h1Elements).map(
            (element: HTMLHeadingElement): string => element.innerText,
        );
        dispatch(setContents(contentsData));
    }, [query]);

    useEffect(() => {
        const handleScroll = () => {
            if (contents.length < 1) return;
            const targetFocus = contents.findIndex((data: string, idx: number) => {
                const h1Elements = document.querySelectorAll('h1');
                if (h1Elements.length < 1) return false;
                const offsetTop = h1Elements[idx].offsetTop;
                return offsetTop >= scrollY;
            });
            dispatch(setFocus(targetFocus));
        };
        handleScroll();
    }, [scrollY]);

    return (
        <Chaser
            className={'sub xl:block hidden ' + (className ? className : '')}
            subject="Contents"
        >
            <ul className="space-y-2 text-center">
                {contents &&
                    contents.map((item: string, key: number) => (
                        <li
                            className="text-xs font-thin tracking-tighter"
                            onClick={() => handleClick(key)}
                            key={key}
                        >
                            <div className="flex justify-center space-x-1">
                                <span
                                    className={
                                        'cursor-pointer duration-150 ' +
                                        (focus === key ? 'text-sky-500 font-bold' : '')
                                    }
                                >
                                    {item}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </Chaser>
    );
};

export default Contents;
