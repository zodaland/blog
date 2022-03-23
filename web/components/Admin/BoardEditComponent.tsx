//글 추가 / 수정 / 삭제할때 파일 인풋 관리
//ref 어떻게 해봐라

import { useEffect, useState, useRef, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';

import Markdown from '../Markdown';
import Loading from '../Loading';
import SubBoardComponent from './SubBoardComponent';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';

import { useAppSelector } from '../../redux/hooks';

import { fetcher } from '../../lib/fetcher';

import { ITag, IBoard, IBoardTag } from '../../interfaces';

const Editor = dynamic(() => import('./Editor'), {
    ssr: false,
    loading: () => <Loading />,
});

const BoardEditComponent = () => {
    const token = useAppSelector((state) => state.token);

    const [tag, setTag] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const addTag = (name: string) => {
        const tagNames: string[] = inputTags.map((tag: ITag) => tag.name);
        if (!name || tagNames.includes(name)) return;
        setInputTags([...inputTags, { name }]);
        setTag('');
    };

    const removeTag = (name: string) => {
        setInputTags(inputTags.filter((tag: ITag) => tag.name !== name));
    };

    useEffect(() => {
        const setFetchTags = async () => {
            const fetchTags = await fetcher('/tag');
            setTags(fetchTags);
        };
        try {
            setFetchTags();
        } catch (error) {}
    }, []);

    const [category, setCategory] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [inputBoard, setInputBoard] = useState<IBoard>({
        category: '',
        title: '',
        date: '',
        content: '',
        file: '',
        private: false,
    });
    const [inputTags, setInputTags] = useState<ITag[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleId = async (id: number) => {
        if (inputBoard.id === id) {
            setInputTags([]);
            setTag('');
            setInputBoard({
                category: '',
                title: '',
                date: '',
                content: '',
                file: '',
                private: false,
            });
            return;
        }

        try {
            const fetchBoard = await fetcher(`/board/${category}/${id}`);
            const tags: ITag[] = fetchBoard.boardTags.map((boardTag: IBoardTag) => {
                return { name: boardTag.tag.name };
            });
            delete fetchBoard.boardTags;
            setInputBoard({
                ...fetchBoard,
            });
            setInputTags(tags);
        } catch (error) {}
    };
    const handleContent = (value: string) => {
        setInputBoard({
            ...inputBoard,
            content: value,
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
        setInputBoard({
            ...inputBoard,
            [name]: value,
        });
    };
    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (typeof e.target === 'undefined') {
            setFile(null);
            return;
        }

        const file = e.target.files ? e.target.files[0] : undefined;
        if (file) {
            setFile(file);
        } else {
            setFile(null);
        }
    };

    const handleSubmit = async () => {
        try {
            let board: IBoard = { ...inputBoard };
            const tags: ITag[] = [...inputTags];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const imageRes = await fetch('https://blogapi.test.zodaland.com/board/image', {
                    mode: 'cors',
                    credentials: 'same-origin',
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!imageRes.ok) throw new Error();
                const text = await imageRes.text();
                const fileName = text.replace(/\n|\r/g, '');
                board = { ...inputBoard, file: fileName };
            }

            await fetcher(`/board`, {
                method: 'POST',
                body: JSON.stringify({ board, tags }),
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            //글 추가시 category가 새로 생성 될 수 있어
            //categories상태를 초기화해주어 다시 불러들이도록 한다.
            setCategories([]);
            setCategory('');
            setInputTags([]);
            setInputBoard({
                category: '',
                title: '',
                date: '',
                content: '',
                file: '',
                private: false,
            });
            setTag('');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';

            alert('작성/수정 완료');
        } catch (error) {
            alert('작성/수정 실패');
        }
    };

    const handleDelete = async () => {
        if (!inputBoard.id) return;
        try {
            await fetcher(`/board/${inputBoard.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInputBoard({
                category: '',
                title: '',
                date: '',
                content: '',
                file: '',
                private: false,
            });
            setTag('');
            setInputTags([]);
            setCategory('');
            //글 제거시 category가 삭제 될 수 있어
            //categories상태를 초기화해주어 다시 불러들이도록 한다.
            setCategories([]);
            if (fileInputRef.current) fileInputRef.current.value = '';

            alert('삭제 완료');
        } catch (error) {
            alert('쓰기 실패');
        }
    };

    useEffect(() => {
        if (inputBoard.id) {
            setInputBoard({
                category: '',
                title: '',
                date: '',
                content: '',
                file: '',
                private: false,
            });
            setTag('');
            setInputTags([]);
            return;
        }

        setInputBoard({
            ...inputBoard,
            category,
        });
    }, [category]);

    useEffect(() => {
        const setFetchCategories = async () => {
            const fetchCategories = await fetcher('/board/category');
            if (fetchCategories.length < 1) return;
            setCategories(fetchCategories);
        };
        if (categories.length > 0) return;
        setFetchCategories();
    }, [categories]);

    return (
        <>
            <section className="main">
                <div className="w-full">
                    <div className="w-full">
                        <div className="mb-4">
                            <div className="w-1/5 inline-block">카테고리</div>
                            <div className="w-2/5 inline-block pr-3">
                                <input
                                    className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory?.(e.target.value)}
                                    list="categoryList"
                                />
                                <datalist id="categoryList">
                                    {categories &&
                                        categories.map((categoryItem, key) => (
                                            <option key={key} value={categoryItem}></option>
                                        ))}
                                </datalist>
                            </div>
                            <div className="w-2/5 inline-block">
                                <div className="flex justify-end">
                                    <button
                                        className="w-30 bg-sky-300 hover:bg-sky-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                                        onClick={handleSubmit}
                                    >
                                        {inputBoard.id && inputBoard.id !== 0 ? '수정' : '작성'}
                                    </button>
                                    {inputBoard.id && inputBoard.id !== 0 && (
                                        <button
                                            className="w-30 bg-red-300 hover:bg-red-500 ml-2 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                                            onClick={handleDelete}
                                        >
                                            삭제
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="w-1/5 inline-block">날짜</div>
                            <div className="w-3/5 inline-block">
                                <input
                                    className="px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                    name="date"
                                    type="text"
                                    value={inputBoard.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-1/5 inline-block">
                                <label className="relative top-0.5 pr-3" htmlFor="privatecheck">
                                    비공개
                                </label>
                                <input
                                    className="relative top-1.5 w-5 h-5"
                                    id="privatecheck"
                                    type="checkbox"
                                    checked={inputBoard.private}
                                    onChange={(e) =>
                                        setInputBoard({ ...inputBoard, private: e.target.checked })
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="w-1/5 inline-block">태그</div>
                            <div className="w-4/5 inline-block">
                                <div className="inline-block">
                                    <input
                                        className="w-24 px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                        name="date"
                                        type="text"
                                        value={tag}
                                        onChange={(e) => setTag(e.target.value)}
                                        list="tagList"
                                    />
                                    <datalist id="tagList">
                                        {tags &&
                                            tags.map((tagItem, key) => (
                                                <option key={key} value={tagItem}></option>
                                            ))}
                                    </datalist>
                                </div>
                                <div className="inline-block">
                                    <button
                                        className="mx-2 w-14 bg-sky-300 hover:bg-sky-500 px-3 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                                        onClick={() => addTag(tag)}
                                    >
                                        추가
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 overflow-hidden">
                            <div className="w-full h-11">
                                <Slider {...getConfigurableProps()}>
                                    {inputTags &&
                                        inputTags.map((tagItem, key) => (
                                            <div
                                                className="bg-gray-300 hover:bg-gray-500 border-4 border-white px-5 py-2 text-sm leading-5 rounded-xl font-semibold text-white"
                                                key={key}
                                                onClick={() => removeTag(tagItem.name)}
                                            >
                                                {tagItem.name}
                                            </div>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="w-1/5 inline-block">파일</div>
                            <div className="w-3/5 inline-block">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFile}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-300 file:text-white hover:file:bg-sky-500"
                                />
                            </div>
                            <div className="w-1/5 inline-block truncate">
                                <span className="text-sky-300">{inputBoard.file}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="w-1/5 inline-block">제목</div>
                            <div className="w-4/5 inline-block">
                                <input
                                    className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                    name="title"
                                    type="text"
                                    value={inputBoard.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full">
                        <div className="w-full mb-10">
                            <Editor
                                setHtml={handleContent}
                                id={inputBoard.id ?? -1}
                                html={inputBoard.content}
                            />
                        </div>
                        <hr className="w-full border border-solid border-black" />
                        <div className="mt-10 w-full">
                            <Markdown html={inputBoard.content} />
                        </div>
                    </div>
                </div>
            </section>
            <SubBoardComponent categories={categories} category={category} handleClick={handleId} />
        </>
    );
};

const getConfigurableProps = () => ({
    infinite: false,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
    touchThreshold: 20,
});

export default BoardEditComponent;
