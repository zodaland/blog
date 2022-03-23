import { useState, useCallback, useEffect, ChangeEvent } from 'react';

import Loading from './Loading';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { fetcher } from '../lib/fetcher';

import { IInputMail, ReCaptchaProps, ErrorWithStatus } from '../interfaces';

const Mail = () => {
    const [verified, setVerified] = useState<boolean>(false);
    return (
        <>
            <section className="sub" />
            <section className="main relative">
                <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                    language="ko"
                >
                    {verified ? (
                        <MailFormComponent />
                    ) : (
                        <ReCaptchaComponent handleVerify={setVerified} />
                    )}
                </GoogleReCaptchaProvider>
            </section>
            <section className="sub" />
        </>
    );
};

const LoadingComponent = () => {
    return (
        <div className="absolute w-full h-full bg-white/80 z-10">
            <Loading />
        </div>
    );
};

const MailFormComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputMail, setInputMail] = useState<IInputMail>({
        name: '',
        email: '',
        subject: '',
        content: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value.trim();

        setInputMail({
            ...inputMail,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const nameRegEx = /^[a-zA-Z가-힣0-9 ]+$/;
        const contentRegEx = /^[a-zA-Zㄱ-ㅎ가-힣0-9.,~!?'" \[\]\-*]+$/;
        const emailRegEx = /^[_a-zA-Z0-9-\.]+@[\.a-zA-Z0-9-]+\.[a-zA-Z]+$/;

        if (!inputMail.subject || !inputMail.content) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        if (inputMail.name && !nameRegEx.test(inputMail.name)) {
            alert('이름에는 한글 혹은 영문만 입력해주세요.');
            return;
        }

        if (inputMail.email && !emailRegEx.test(inputMail.email)) {
            alert('적절한 이메일을 입력해주세요.');
            return;
        }

        if (!contentRegEx.test(inputMail.subject)) {
            alert('제목에 부적절한 특수문자를 제거해주세요.');
            return;
        }

        if (!contentRegEx.test(inputMail.content)) {
            alert('내용에 부적절한 특수문자를 제거해주세요.');
            return;
        }

        setIsLoading(true);
        fetcher('/mail', {
            method: 'POST',
            body: JSON.stringify({ inputMail }),
        })
            .then((isSuccess) => {
                if (!isSuccess) throw new Error();
                alert('발송 완료 되었습니다.\n\n소중한 시간 내어주셔서 감사합니다.');
            })
            .catch((error) => {
                if (error instanceof ErrorWithStatus && error.status === 400) {
                    alert('부적절한 특수문자를 제거해주세요.');
                } else {
                    alert('죄송합니다. 발송에 실패했습니다.\n잠시 후 다시 시도해주세요.');
                }
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            {isLoading && <LoadingComponent />}
            <p className="w-full mt-6 mb-12 text-xl text-center">
                저와 소통을 원하신다면 메시지를 남겨주세요.
            </p>
            <div className="w-full">
                <div className="w-full">
                    <div className="mb-4">
                        <div className="w-1/5 inline-block">이름</div>
                        <div className="w-3/5 inline-block pr-3">
                            <input
                                className="w-52 px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                name="name"
                                type="text"
                                value={inputMail.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/5 inline-block">
                            <div className="flex justify-end">
                                <button
                                    className="w-full bg-sky-300 hover:bg-sky-500 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white"
                                    onClick={handleSubmit}
                                >
                                    작성
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="w-1/5 inline-block">이메일</div>
                        <div className="w-4/5 inline-block">
                            <input
                                className="w-52 px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                name="email"
                                type="text"
                                value={inputMail.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="w-1/5 inline-block">
                            제목
                            <span className="relative top-1 text-red-500 text-2xl">*</span>
                        </div>
                        <div className="w-4/5 inline-block">
                            <input
                                className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                                name="subject"
                                type="text"
                                value={inputMail.subject}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="w-1/5 inline-block float-left">
                            내용
                            <span className="relative top-1 text-red-500 text-2xl">*</span>
                        </div>
                        <div className="w-4/5 inline-block">
                            <textarea
                                className="w-full h-80 border border-gray-300 focus:border-sky-300 focus:outline-none rounded-md p-3"
                                name="content"
                                value={inputMail.content}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const ReCaptchaComponent = ({ handleVerify }: ReCaptchaProps) => {
    const [onSuccess, setOnSuccess] = useState<boolean>(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            return;
        }
        const token = await executeRecaptcha('token');
        try {
            const isReCaptchaSuccess = await fetcher(`/auth/recaptcha?token=${token.toString()}`);
            setOnSuccess(isReCaptchaSuccess);
        } catch (error) {}
    }, [executeRecaptcha]);

    useEffect(() => {
        handleReCaptchaVerify();
    }, [handleReCaptchaVerify]);

    useEffect(() => {
        if (!onSuccess) return;
        const timeoutId = window.setTimeout(() => {
            handleVerify(onSuccess);
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [onSuccess]);

    return (
        <>
            <Loading />
            <div className="flex flex-col mt-6">
                <p className="text-2xl font-bold text-center">
                    Google reCAPTCHA가 사용자를 확인하는 중입니다.
                </p>
                <p className="text-xl text-center">빠른 확인을 원하시면 아래 버튼을 눌러주세요.</p>
                <button
                    className={
                        'place-self-center w-60 my-6 px-5 py-2 text-sm leading-5 rounded-md font-bold text-white ' +
                        (onSuccess
                            ? 'bg-red-500 transition duration-1000'
                            : 'bg-sky-300 hover:bg-sky-500')
                    }
                    onClick={handleReCaptchaVerify}
                >
                    {onSuccess ? '✓' : '나는 로봇이 아닙니다.'}
                </button>
            </div>
        </>
    );
};

export default Mail;
