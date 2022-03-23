import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Chaser from './Chaser';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setTags } from '../redux/modules/uriSlice';

import { apiUrl, fetcher } from '../lib/fetch';
import useSWR from 'swr';

const Tags = () => {
    const router = useRouter();

    const [isTagsOn, setIsTagsOn] = useState<boolean[]>([false]);
    const handleClick = (toggledKey: number) => {
        if (id) router.push(`/${category}`);
        const toggledActive: boolean = isTagsOn[toggledKey] ? false : true;
        setIsTagsOn(isTagsOn.map((isTagOn, key) => (toggledKey !== key ? isTagOn : toggledActive)));
    };

    const { category, tags, id } = useAppSelector((state) => state.uri);
    const dispatch = useAppDispatch();

    const { data } = useSWR(category ? `${apiUrl}/tag/${category}` : null, fetcher);

    useEffect(() => {
        if (data)
            setIsTagsOn(data.map((tag: string) => (tags && tags.includes(tag) ? true : false)));
    }, [data]);

    useEffect(() => {
        if (!data) return;
        const tags = data.filter((_: string, key: number) => isTagsOn[key]);
        if (tags.length > 0) {
            dispatch(setTags(tags));
        } else {
            dispatch(setTags(null));
        }
    }, [isTagsOn]);

    return (
        <Chaser className="sub xl:flex justify-end hidden w-fit h-fit pl-auto" subject="Tags">
            <ul className="space-y-2 text-center">
                {data &&
                    data.map((tag: string, key: number) => (
                        <li className="text-xs font-thin tracking-tighter duration-150 " key={key}>
                            <div className="flex justify-center space-x-1">
                                <span
                                    className={
                                        'cursor-pointer duration-150 ' +
                                        (isTagsOn[key] ? 'font-bold text-sky-500' : '')
                                    }
                                    onClick={() => handleClick(key)}
                                >
                                    {tag}
                                </span>
                            </div>
                        </li>
                    ))}
            </ul>
        </Chaser>
    );
};

export default Tags;
