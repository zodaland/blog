import { useState, useEffect, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';

import Loading from '../Loading';
import Markdown from '../Markdown';

import { useAppSelector } from '../../redux/hooks';

import { fetcher } from '../../lib/fetcher';

import { IIntro } from '../../interfaces';

const Editor = dynamic(() => import('./Editor'), {
    ssr: false,
    loading: () => <Loading />,
});

const MainEditComponent = () => {
    const token = useAppSelector((state) => state.token);

    const [successFlag, setSuccessFlag] = useState<number>(0);
    const [intro, setIntro] = useState<IIntro>({
        name: '',
        introduce: '',
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setIntro({
            ...intro,
            [name]: value,
        });
    };
    const handleIntroduce = (value: string) => {
        setIntro({
            ...intro,
            introduce: value,
        });
    };
    const handleSubmit = async () => {
        try {
            await fetcher('/intro', {
                method: 'POST',
                body: JSON.stringify(intro),
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('변경 성공');
        } catch (error) {
            alert('변경 실패');
        }
    };
    const getIntro = async () => {
        try {
            const fetchIntro = await fetcher('/intro');
            setIntro(fetchIntro);
            setSuccessFlag(1);
        } catch (error) {}
    };
    useEffect(() => {
        getIntro();
    }, []);
    return (
        <>
            <section className="main">
                <div className="w-full">
                    <div className="mb-4">
                        <div className="w-1/5 inline-block">이름</div>
                        <div className="w-3/5 inline-block">
                            <input
                                className="px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                name="name"
                                type="text"
                                value={intro.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/5 inline-block">
                            <button
                                className="w-full bg-sky-300 hover:bg-sky-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                                onClick={handleSubmit}
                            >
                                수정
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full">
                    <div className="w-full mb-10">
                        <Editor setHtml={handleIntroduce} id={successFlag} html={intro.introduce} />
                    </div>
                    <hr className="w-full border border-solid border-black" />
                    <div className="mt-10 w-full">
                        <Markdown html={intro.introduce} />
                    </div>
                </div>
            </section>
            <section className="sub" />
        </>
    );
};

export default MainEditComponent;
