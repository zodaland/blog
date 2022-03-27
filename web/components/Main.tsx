import Link from 'next/link';
import { FileText, AtSign } from 'react-feather';

import Contents from './Contents';
import Markdown from './Markdown';
import { ShortBulletinBoard } from './Bulletin';
import Img from './Img';

import { MainProps, BoardsProps } from '../interfaces';

const Main = ({ boards, intro }: MainProps) => {
    return (
        <>
            <section className="sub xl:block hidden" />
            <div className="main mt-8">
                <div className="flex md:flex-row flex-col">
                    <div className="flex justify-center md:w-1/4 w-full h-48">
                        <div className="w-48 h-full rounded-full overflow-hidden">
                            <Img file="profile.jpg" />
                        </div>
                    </div>
                    <div className="md:w-3/4 w-full p-2">
                        <div className="flex w-full h-1/4">
                            <div className="flex grow">
                                <h1>
                                    <span className="font-bold text-3xl tracking-widest">
                                        {intro.name}
                                    </span>
                                    <span className="text-base self-end">의 블로그입니다.</span>
                                </h1>
                            </div>
                            <div className="flex justify-self-end md:space-x-6 space-x-3 h-9">
                                <Link href="/resume">
                                    <a>
                                        <FileText className="p-1 w-8 h-8 hover:text-gray-300 transition duration-300" />
                                    </a>
                                </Link>
                                <Link href="/mail">
                                    <a>
                                        <AtSign className="p-1 w-8 h-8 hover:text-gray-300 transition duration-300" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <Markdown className="p-2" html={intro.introduce} />
                    </div>
                </div>
                <BoardComponent data={boards} />
            </div>
            <Contents data={boards} />
        </>
    );
};
//게시글 입력기능 만들기, 검색기능 만들기, 방문자 체크, 백단 auth 추가
const BoardComponent = ({ data }: BoardsProps) => {
    return (
        <>
            <div className="flex items-center w-full mt-12">
                <hr className="grow h-1 border-t-2 border-solid border-black z-0" />
                <span className="font-bold text-base px-2 z-10 bg-white ">Latest Posting</span>
                <hr className="grow h-1 border-t-2 border-solid border-black z-0" />
            </div>
            <div className="divide-y mb-8">
                <ShortBulletinBoard data={data} />
            </div>
        </>
    );
};

export default Main;
