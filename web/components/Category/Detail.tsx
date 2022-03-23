import Markdown from '../Markdown';
import Img from '../Img';
import Contents from '../Contents';
import Tags from '../Tags';
import Loading from '../Loading';

import { getDate } from '../../lib/util';

import { ServerSideBoardProps, IBoardTag, ImageProps } from '../../interfaces';

const Detail = ({ board }: ServerSideBoardProps) => {
    if (!board) return <Loading className="w-full mt-24" />;
    return (
        <>
            {board.file && <MainImageComponent file={board.file} />}
            <div className="flex flex-wrap items-start justify-center w-full">
                <Tags />
                <section className="main space-y-4">
                    <h1 className="font-bold md:text-3xl text-2xl tracking-tight mb-2">
                        {board.title}
                    </h1>
                    <span>작성일 : {getDate(board.date)}</span>
                    <hr className="w-full border-1 border-solid border-gray-300" />
                    <ul className="flex flex-wrap justify-center">
                        {board.boardTags &&
                            board.boardTags.map((boardTag: IBoardTag, key: number) => (
                                <li className="text-lg font-bold mx-1" key={key}>
                                    #{boardTag.tag.name}
                                </li>
                            ))}
                    </ul>
                    <Markdown className="py-8" html={board.content ?? ''} />
                </section>
                <Contents />
            </div>
        </>
    );
};

const MainImageComponent = ({ file }: ImageProps) => {
    return (
        <div className="relative w-pic h-pic mb-8">
            <Img file={file} />
        </div>
    );
};

export default Detail;
