import Head from 'next/head';

import Footer from '../components/Footer';
import Img from '../components/Img';

const ResumePage = () => {
    const title = 'Resume | ' + process.env.NEXT_PUBLIC_TITLE;
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="robots" content="noindex" />
            </Head>
            <div className="flex justify-center">
                <div className="main resume">
                    <h1 className="text-5xl font-bold mt-10 mb-14">
                        저는<span className="text-sky-300">,</span>
                    </h1>
                    <div className="flex md:flex-row flex-col">
                        <div className="flex justify-center md:w-2/6 w-full h-60">
                            <div className="w-60 h-full rounded-full overflow-hidden">
                                <Img file="profile.jpg" />
                            </div>
                        </div>
                        <div className="md:w-4/6 w-full">
                            <p className="h-1/5 mt-4 md:mb-12 mb-6 md:pl-14 pl-0 text-5xl font-bold md:text-left text-center">
                                조다훈
                            </p>
                            <div className="h-4/5 w-full md:pl-10 pl-0 md:text-2xl text-xl font-thin">
                                <div className="w-full divide-y-8 divide-transparent">
                                    <ul>
                                        <li className="inline-block w-1/4 text-right pr-12">
                                            Email.
                                        </li>
                                        <li className="inline-block w-3/4 text-left">
                                            <a href="/mail" target="_blank">
                                                me@zodaland.com
                                            </a>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li className="inline-block w-1/4 text-right pr-12">
                                            Blog.
                                        </li>
                                        <li className="inline-block w-3/4 text-left">
                                            <a href="/" target="_blank">
                                                https://www.zodaland.com
                                            </a>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li className="inline-block w-1/4 text-right pr-12">
                                            Github.
                                        </li>
                                        <li className="inline-block w-3/4 text-left">
                                            <a href="https://github.com/zodaland" target="_blank">
                                                https://github.com/zodaland
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pl-2">
                        <ul className="ml-7 list-square list-outside divide-y-8 divide-transparent text-3xl font-bold">
                            <li>삽질 개발자 입니다.</li>
                        </ul>
                        <p className="mt-5 pl-7 md:text-2xl text-xl">
                            공사 현장에서 1년 반 이상 일한 경험으로 쌓은 꾸준함과 공사를 완료하는
                            성취감을 바탕으로 개발에 임하고 있습니다. 개발 중에 발생하는 오류를 놓지
                            않고 끝까지 도전하여 해결하는 자신감이 있으며 첫 삽부터 완료까지 3개의
                            프로젝트를 제작해본 경험을 가지고 있습니다.
                        </p>
                    </div>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        해 왔던 일은<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:ml-0 ml-3">
                        <div className="flex md:flex-row flex-col">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">코리아센터</p>
                                <p className="mt-4">2020.04 - 2022.</p>
                                <p className="leading-3 font-thin">Web Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">연 매출 1700억의 중견 IT기업</p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>PHP / CodeIgniter / MySQL 환경에서의 개발 경험</li>
                                    <li>JAVA 환경에서의 RFC 5730(EPP)표준에 따른 개발 경험</li>
                                    <li>
                                        2021년 8월 부터 2022년 3월까지 시스템 혼자서 개발 / 배포 /
                                        운영 담당
                                    </li>
                                    <li>3만 건의 도메인 및 14만 건의 DNS 관리 경험</li>
                                    <li>
                                        정산 시스템 페이지 로딩 시간 평균 1.51초에서 0.36초로 성능
                                        개선
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        해 왔던 것은<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:mx-0 mx-3">
                        <div className="flex md:flex-row flex-col mb-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">블로그</p>
                                <p className="mt-4">2022.01 - 2022.03</p>
                                <p className="leading-3 font-thin">Author</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">
                                    <a href="https://github.com/zodaland/blog" target="_blank">
                                        https://github.com/zodaland/blog
                                    </a>
                                </p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>개인 블로그 개발 및 운영</li>
                                    <li>TypeScript 기반의 백엔드 / 프론트엔드 개발 전담</li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">
                                        TypeScript, NestJS, MySQL, TypeORM, Next.js, Redux, TOAST
                                        UI, reCAPTCHA, SWR, winston
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">4senc</p>
                                <p className="mt-4">2021.11 - 2022.01</p>
                                <p className="leading-3 font-thin">Main Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">
                                    <a href="https://github.com/zodaland/4senc" target="_blank">
                                        https://github.com/zodaland/4senc
                                    </a>
                                </p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>GraphQL 기반의 사이드 프로젝트</li>
                                    <li>
                                        TypeScript 기반의 백엔드 / JavaScript 기반의 프론트엔드 개발
                                        전담
                                    </li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">
                                        TypeScript, Express.js, GraphQL, MySQL, winston, JavaScript,
                                        Next.js, Apollo
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">MallTalk</p>
                                <p className="mt-4">2021.02 - 2021.03</p>
                                <p className="leading-3 font-thin">Main Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">
                                    <a href="https://github.com/zodaland/molltalk" target="_blank">
                                        https://github.com/zodaland/molltalk
                                    </a>
                                </p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>웹 채팅 구현 사이드 프로젝트</li>
                                    <li>JavaScript 기반의 백엔드 / 프론트엔드 개발 전담</li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">
                                        JavaScript, Express.js, Mongoose, MongoDB, MySQL, WebSocket,
                                        React, Recoil
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">인덕대학교</p>
                                <p className="mt-4">2013.03 - 2020.02</p>
                                <p className="leading-3 font-thin">Student</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">컴퓨터소프트웨어학과</p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>
                                        3년간 공부하며 컴퓨터구조, OS, 서버, 네트워크, 자료구조, 웹
                                        프로그래밍 등의 과목을 공부했습니다.
                                    </li>
                                    <li>
                                        재학 중 2년 간의 여러가지 아르바이트, 1년 반 동안의 공사
                                        현장 일을 병행하다보니 졸업이 다소 늦어졌습니다.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        할 수 있는 것은<span className="text-sky-300">,</span>
                    </h1>
                    <ul className="mt-4 md:ml-6 ml-8 list-square list-outside divide-y-8 divide-transparent">
                        <li className="text-2xl font-bold">Language</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">
                                JavaScript
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">TypeScript</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">PHP</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Java</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">
                                Shell&nbsp;script
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">HTML/CSS</li>
                        </ul>
                        <li className="text-2xl font-bold">Framework</li>
                        <li className="md:ml-10 ml-5 text-2xl">Back End</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">
                                NestJS
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Express.js</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">TypeORM</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">CodeIgniter</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Laravel</li>
                        </ul>
                        <li className="md:ml-10 ml-5 text-2xl">Front End</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">React</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Next.js</li>
                        </ul>
                        <li className="text-2xl font-bold">Database</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">MySQL</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">MongoDB</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Redis</li>
                        </ul>
                        <li className="text-2xl font-bold">Etc.</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">
                                Ubuntu
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Jenkins</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">DNS</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Docker</li>
                            <li className="md:col-span-1 col-span-2 text-xl font-thin md:ml-10 ml-5 mt-2">
                                Docker compose
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Nginx</li>
                            <li className="md:col-span-1 col-span-2 text-xl font-thin md:ml-10 ml-5 mt-2">
                                Websocket/Socket.io
                            </li>
                            <li className="md:col-span-2 col-span-3 text-xl font-thin md:ml-10 ml-5 mt-2">
                                Extensible Provisioning Protocol(EPP)
                            </li>
                        </ul>
                    </ul>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        할 수 있는 일은<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y">
                        <div className="mb-12">
                            <p className="text-3xl font-bold">Infra</p>
                            <ul className="mt-4 md:ml-5 ml-7 list-square list-outside divide-y-4 divide-transparent text-lg font-thin">
                                <li>
                                    Name server 구축 및 운영, was / 네트워크 설정 등 인프라 관리
                                </li>
                                <li>
                                    iptables 관리 및 GeoIP 설정, Nmap 사용, 서버 OTP 적용 등 보안
                                    관리
                                </li>
                                <li>
                                    비효율 적인 프로세스 개선 및 Shell script를 통한 관리 자동화
                                </li>
                                <li>로그관리 및 모니터링</li>
                            </ul>
                        </div>
                        <div className="mb-12 pt-12">
                            <p className="text-3xl font-bold">Docker Environments</p>
                            <ul className="mt-4 md:ml-5 ml-7 list-square list-outside divide-y-4 divide-transparent text-lg font-thin">
                                <li>Docker 환경 구성 및 개발</li>
                                <li>Docker compose 설정을 통한 다중 컨테이너 앱 관리</li>
                                <li>컨테이너간 통신 및 다수 컨테이너의 통신 환경 구성</li>
                            </ul>
                        </div>
                        <div className="mb-12 pt-12">
                            <p className="text-3xl font-bold">DevOps</p>
                            <ul className="mt-4 md:ml-5 ml-7 list-square list-outside divide-y-4 divide-transparent text-lg font-thin">
                                <li>Jenkins, github을 이용한 CI 환경 구성</li>
                                <li>Jenkins를 이용한 OTP 인증 환경 구성</li>
                                <li>SSL 인증서 자동 연장 환경 구성</li>
                            </ul>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        감사합니다<span className="text-sky-300">.</span>
                    </h1>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ResumePage;
