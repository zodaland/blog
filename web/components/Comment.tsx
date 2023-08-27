import { ChangeEvent, useState } from 'react';
import Loading from './Loading';
import {
    CommentProps,
    CommentEditProps,
    Comment,
    InputComment,
    ErrorWithStatus,
} from '../interfaces';
import { fetcher } from '../lib/fetcher';
import { User, XCircle, CheckCircle } from 'react-feather';
import useSWR from 'swr';

import { getDate, getSimpleDate } from '../lib/util';

const Comment = ({ id }: CommentProps) => {
    const [delMode, setDelMode] = useState<number | undefined>(undefined);
    const [password, setPassword] = useState<string>('');

    const privateComment = '비밀 댓글 입니다.';
    const { data, mutate } = useSWR(`/comment/board/${id}`, fetcher);
    if (!data) return <Loading className="w-full" />;

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleMode = (id: number | undefined) => {
        setPassword('');
        setDelMode(id === delMode ? undefined : id);
    };

    const handleDelete = async (id: number | undefined) => {
        if (password.length < 1) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        try {
            const body = { id, password };
            const isSuccess = await fetcher('/comment', {
                method: 'DELETE',
                body: JSON.stringify(body),
            });
            if (isSuccess) {
                alert('삭제 되었습니다.');
                mutate();
            }
        } catch (error) {
            if (error instanceof ErrorWithStatus) {
                if (error.status === 400) {
                    alert('올바르지 않은 접근입니다.');
                } else if (error.status === 404) {
                    alert('이미 삭제된 댓글입니다.');
                } else if (error.status === 401) {
                    alert('비밀번호가 틀립니다.');
                } else {
                    alert('죄송합니다. 삭제 실패했습니다.\n잠시 후 다시 시도해주세요.');
                }
            } else {
                alert('죄송합니다. 삭제 실패했습니다.\n잠시 후 다시 시도해주세요.');
            }
        }
    };

    return (
        <>
            <div className="w-full divide-y">
                {data.length > 0 &&
                    data.map((comment: Comment, key: number) => (
                        <div className="flex pt-4" key={key}>
                            <div className="flex flex-col w-12 p-1">
                                <div className="rounded-full bg-sky-100">
                                    <User className="w-10 h-10 rounded-full text-sky-800" />
                                </div>
                                <div className="mt-4 mb-2 h-full text-center">
                                    <p className="w-3 m-auto h-full bg-sky-100 rounded-full" />
                                </div>
                            </div>
                            <div className="grow">
                                <div className="flex h-10 ml-3">
                                    <div
                                        className={
                                            'flex items-center ' +
                                            (delMode === comment.id ? 'sm:flex hidden' : '')
                                        }
                                    >
                                        <p className="min-w-fit text-xl">{comment.name}</p>
                                        <p className="mx-2">&middot;</p>
                                        <p className="min-w-0 h-5 mt-1 text-sm text-gray-700 overflow-hidden">
                                            {getDate(comment.date)}
                                        </p>
                                    </div>
                                    <p className="grow flex justify-end mr-2">
                                        <input
                                            className={
                                                'px-3 py-2 mx-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm ' +
                                                (delMode === comment.id ? '' : 'hidden')
                                            }
                                            type="password"
                                            value={password}
                                            onChange={handlePassword}
                                            placeholder="비밀번호"
                                        />
                                        <CheckCircle
                                            className={
                                                'self-center cursor-pointer text-sky-300 ' +
                                                (delMode === comment.id ? '' : 'hidden')
                                            }
                                            onClick={() => handleDelete(comment.id)}
                                        />
                                        <XCircle
                                            className="self-center cursor-pointer text-red-300 ml-2"
                                            onClick={() => handleMode(comment.id)}
                                        />
                                    </p>
                                </div>
                                <div className="m-5 whitespace-pre-line">
                                    {comment.private ? privateComment : comment.comment}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <CommentEdit id={id} mutate={mutate} />
        </>
    );
};

const CommentEdit = ({ id, mutate }: CommentEditProps) => {
    const [input, setInput] = useState<InputComment>({
        name: '',
        password: '',
        private: false,
        comment: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setInput({ ...input, [name]: value });
    };

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const flag = e.target.checked;
        setInput({ ...input, private: flag });
    };

    const handleSubmit = async () => {
        const nameRegEx = /^[0-9a-zA-Z가-힣]{0,10}$/;
        if (!nameRegEx.test(input.name)) {
            alert('이름에 한글 / 영문 / 숫자만 10자 이내로 입력 해주세요.');
            return;
        }
        const commentRegEx = /^[-0-9a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ!?:\/.,();~ \n]+$/;
        if (input.comment.length === 0) {
            alert('댓글을 입력해주세요.');
            return;
        }
        if (!commentRegEx.test(input.comment)) {
            alert('댓글에 한글 / 영문 / 숫자와 일부 특수문자(~ - ! , . ( ) ;)만 입력 해주세요.');
            return;
        }
        try {
            const comment: Comment = {
                ...input,
                date: getSimpleDate(),
                boardId: id,
            };

            const isSuccess = await fetcher('/comment', {
                method: 'POST',
                body: JSON.stringify({ comment }),
            });
            if (isSuccess) {
                setInput({
                    name: '',
                    password: '',
                    private: false,
                    comment: '',
                });
                mutate();
                alert('의견을 남겨주셔서 감사합니다.');
            }
        } catch (error) {
            if (error instanceof ErrorWithStatus && error.status === 400) {
                alert('부적절한 특수문자를 제거해주세요.');
            } else {
                alert('죄송합니다. 작성 실패했습니다.\n잠시 후 다시 시도해주세요.');
            }
        }
    };

    return (
        <div className="grid grid-cols-4 gap-4 w-full mt-10">
            <div className="col-span-1">
                <input
                    className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                    name="name"
                    type="text"
                    placeholder="이름"
                    value={input.name}
                    onChange={handleChange}
                />
            </div>
            <div className="col-span-1">
                <input
                    className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={input.password}
                    onChange={handleChange}
                />
            </div>
            <div className="col-span-1">
                <label
                    className="relative md:pr-3 pr-1 bottom-1 md:text-lg text-md font-thin text-gray-500"
                    htmlFor="privatecheck"
                >
                    비공개
                </label>
                <input
                    className="relative top-1 w-7 h-7"
                    id="privatecheck"
                    type="checkbox"
                    checked={input.private}
                    onChange={handleCheck}
                />
            </div>
            <div className="col-span-1 flex justify-end">
                <button
                    className="align-right w-30 bg-sky-300 hover:bg-sky-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                    onClick={handleSubmit}
                >
                    작성
                </button>
            </div>
            <div className="col-span-4">
                <textarea
                    className="w-full h-28 px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm resize-y"
                    name="comment"
                    value={input.comment}
                    onChange={handleChange}
                    placeholder="한글 / 영문 / 숫자와 일부 특수문자(~ - ! , . ( ) ; ? /)만 입력 해주세요."
                />
            </div>
        </div>
    );
};

export default Comment;
