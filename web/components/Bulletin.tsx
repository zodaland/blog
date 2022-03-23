import Link from 'next/link';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Img from './Img';
import Loading from './Loading';

import { ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'react-feather';

import { useAppSelector } from '../redux/hooks';

import { getDate } from '../lib/util';

import {
    BoardsProps,
    BulletinProps,
    PageOptionProps,
    IBoardTag,
    ImageProps,
    IBoard,
} from '../interfaces';

const Bulletin = ({ data, pageOption, handlePage }: BulletinProps) => {
    const { category } = useAppSelector((state) => state.uri);
    if (!data) return <Loading className="main mt-24" />;
    if (data.length < 1)
        return <p className="text-center text-xl mt-16">표시할 내용이 없습니다.</p>;
    return (
        <>
            <div className="divide-y">
                {(() => {
                    switch (category) {
                        case 'tip':
                            return <ShortBulletinBoard data={data} />;
                            break;
                        default:
                            return <LongBulletinBoard data={data} />;
                            break;
                    }
                })()}
            </div>
            <PageComponent pageOption={pageOption} handlePage={handlePage} />
        </>
    );
};

export const PageComponent = ({ pageOption, handlePage }: PageOptionProps) => {
    return (
        <div className="flex justify-center mb-8 divide-x-8 divide-transparent">
            {pageOption.prev ? (
                <>
                    <span className="px-2 cursor-pointer" onClick={() => handlePage(1)}>
                        <ChevronsLeft />
                    </span>
                    <span
                        className="px-2 cursor-pointer"
                        onClick={() => handlePage(pageOption.pages[0] - 1)}
                    >
                        <ChevronLeft />
                    </span>
                </>
            ) : (
                <>
                    <span className="px-2 text-gray-300">
                        <ChevronsLeft />
                    </span>
                    <span className="px-2 text-gray-300">
                        <ChevronLeft />
                    </span>
                </>
            )}
            {pageOption.pages &&
                pageOption.pages.map((n, key) => (
                    <span
                        className={
                            'px-2 ' + (pageOption.page != n ? 'cursor-pointer' : 'font-bold')
                        }
                        key={key}
                        onClick={() => handlePage(n)}
                    >
                        {n}
                    </span>
                ))}
            {pageOption.next ? (
                <>
                    <span
                        className="px-2 font-bold cursor-pointer"
                        onClick={() => handlePage(pageOption.pages[pageOption.boundary - 1] + 1)}
                    >
                        <ChevronRight />
                    </span>
                    <span
                        className="px-2 font-bold cursor-pointer"
                        onClick={() => handlePage(pageOption.total)}
                    >
                        <ChevronsRight />
                    </span>
                </>
            ) : (
                <>
                    <span className="px-2 text-gray-300">
                        <ChevronRight />
                    </span>
                    <span className="px-2 text-gray-300">
                        <ChevronsRight />
                    </span>
                </>
            )}
        </div>
    );
};

export const ShortBulletinBoard = ({ data }: BoardsProps) => {
    return (
        <>
            {data &&
                data.map((item: IBoard, key) => (
                    <article className="w-full mb-8" key={key}>
                        <Link href={`/${item.category}/${item.id}`} passHref>
                            <a>
                                <div className="h-full">
                                    <div className="h-12">
                                        <Slider {...getConfigurableProps()}>
                                            {item.boardTags &&
                                                sliderChildren(
                                                    item.boardTags.map(
                                                        (boardTag: IBoardTag) => boardTag.tag.name,
                                                    ),
                                                )}
                                        </Slider>
                                    </div>
                                    <h1 className="text-2xl tracking-tighter">{item.title}</h1>
                                    <span className="text-sm font-thin">{getDate(item.date)}</span>
                                    <div className="my-4">
                                        <p className="text-base md:leading-6 leading-5 text-gray-500">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </article>
                ))}
        </>
    );
};

export const LongBulletinBoard = ({ data }: BoardsProps) => {
    return (
        <>
            {data &&
                data.map((item: IBoard, key) => (
                    <article className="w-full h-60 mb-8" key={key}>
                        <Link href={`/${item.category}/${item.id}`} passHref>
                            <a>
                                <div className="grid grid-cols-8 grid-rows-5 h-full">
                                    <div className="col-span-8">
                                        <Slider {...getConfigurableProps()}>
                                            {item.boardTags &&
                                                sliderChildren(
                                                    item.boardTags.map(
                                                        (boardTag: IBoardTag) => boardTag.tag.name,
                                                    ),
                                                )}
                                        </Slider>
                                    </div>
                                    <div className="md:col-span-5 col-span-8">
                                        <h1 className="text-2xl truncate tracking-tighter">
                                            {item.title}
                                        </h1>
                                    </div>
                                    <div className="col-span-5 row-span-2">
                                        <p className="h-full text-base overflow-hidden md:leading-6 leading-5 text-gray-500">
                                            {item.content}
                                        </p>
                                    </div>
                                    <div className="col-span-5 mt-2 flex items-end">
                                        <span className="text-sm font-thin">
                                            {getDate(item.date)}
                                        </span>
                                    </div>
                                    {item.file && (
                                        <MainImageComponent
                                            className="col-span-3 col-start-6 md:row-start-2 row-start-3 md:row-span-4 row-span-3 relative"
                                            file={item.file}
                                        />
                                    )}
                                </div>
                            </a>
                        </Link>
                    </article>
                ))}
        </>
    );
};

const MainImageComponent = ({ className, file }: ImageProps) => {
    return (
        <div className={className}>
            <Img file={file} />
        </div>
    );
};

const getConfigurableProps = () => ({
    infinite: false,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
    touchThreshold: 20,
});

const sliderChildren = (tags: string[]) =>
    tags &&
    tags.map((tag, key) => (
        <div className="text-xl italic font-bold mr-4 py-2" key={key}>
            #{tag}
        </div>
    ));

export default Bulletin;
