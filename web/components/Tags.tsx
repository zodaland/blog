import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Chaser from './Chaser';

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setTags } from '../redux/modules/uriSlice';

import { fetcher } from '../lib/fetcher';

const Tags = () => {
    const { category, tags, id } = useAppSelector((state) => state.uri);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [tagList, setTagList] = useState<string[]>([]);
    const handleClick = (toggledKey: number) => {
        if (tags.includes(tagList[toggledKey])) {
            dispatch(setTags(tags.filter((tag: string) => tag !== tagList[toggledKey])));
        } else {
            dispatch(setTags([...tags, tagList[toggledKey]]));
        }
    };

    useEffect(() => {
        const initiateTag = async () => {
            try {
                if (!category) return;
                const fetchTags = await fetcher(`/tag/${category}`);
                setTagList(fetchTags);
            } catch (error) {}
        };
        initiateTag();
    }, [category]);

    useEffect(() => {
        if (id) router.push(`/${category}`);
    }, [tags]);

    return (
        <Chaser className="sub xl:flex justify-end hidden w-fit h-fit pl-auto" subject="Tags">
            <ul className="space-y-2 text-center">
                {tagList &&
                    tagList.map((tag: string, key: number) => (
                        <li className="text-xs font-thin tracking-tighter duration-150 " key={key}>
                            <div className="flex justify-center space-x-1">
                                <span
                                    className={
                                        'cursor-pointer duration-150 ' +
                                        (tags.length > 0 && tags.includes(tag)
                                            ? 'font-bold text-sky-500'
                                            : '')
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
