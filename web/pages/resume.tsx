import Head from 'next/head';

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
                            <p className="h-1/5 mt-4 md:mb-4 mb-6 md:pl-14 pl-0 text-5xl font-bold md:text-left text-center">
                                조다훈
                            </p>
                            <div className="h-4/5 w-full md:pl-10 pl-0 md:text-2xl text-xl font-thin">
                                <div className="w-full divide-y-8 divide-transparent">
                                    <ul>
                                        <li className="inline-block w-1/4 text-right pr-12">
                                            H.P.
                                        </li>
                                        <li className="inline-block w-3/4 text-left">
                                            <a href="/mail" target="_blank">
                                                010-3660-8099
                                            </a>
                                        </li>
                                    </ul>
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
                                                https://zoda.land
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
                        <ul className="ml-7 list-square list-outside divide-y-8 divide-transparent">
                            <li className="mt-5 ml-5 mr-2 md:text-2xl text-xl">
                                서비스를 설계, 개발, 운영한 경험을 바탕으로 생산성과 안정성 있는
                                구조에 대해 늘 고민하며 회사와 공동의 목표 달성을 최우선으로
                                생각합니다.
                            </li>
                            <li className="ml-5 mr-2 md:text-2xl text-xl">
                                앎과 이해가 커뮤니케이션의 핵심이라고 여기며 좋은 협업을 위해 테스트
                                코드 작성과 더불어 다방면에 관심을 쏟고 있습니다.
                            </li>
                            <li className="ml-5 mr-2 md:text-2xl text-xl">
                                도전을 통해 경험하고 학습하며 어떤 환경에서든 빠르게 적응하고
                                능동적으로 일을 수행 할 수 있습니다.
                            </li>
                        </ul>
                    </div>
                    <h1 className="text-5xl font-bold mt-28 mb-14">
                        해 왔던 것은<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:mx-0 mx-3">
                        <div className="flex md:flex-row flex-col mb-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">개인 서버</p>
                                <p className="mt-4">2020.08 - 2022.05</p>
                                <p className="leading-3 font-thin">root</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin"></p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>서버 세팅부터 개발, 관리 등 전반적인 운영</li>
                                    <li>
                                        최소한의 서버 구성과 Docker 컨테이너 사용을 최대화한 인프라
                                        구성
                                    </li>
                                    <li className="ml-5">
                                        Nginx, Node.js, php-fpm, Java/Spring, MySQL, MongoDB, Redis,
                                        Jenkins, Certbot, Mail Server/Client 등 구축 및 운영
                                    </li>
                                    <li>
                                        서버, WAS, 서비스 환경 3단계의 로그 관리와 메일 발송 및 알람
                                        처리를 통한 이슈 관리
                                    </li>
                                    <li>
                                        실제 공격(SSH Brute force Attack, kdevtmpfsi)을 바탕으로
                                        기른 보안 개념과 iptables 관리, 서버 OTP 로그인 적용
                                    </li>
                                    <li>
                                        Jenkins, ShellScript 구성으로 웹사이트 인증서 자동 갱신 환경
                                        구축
                                    </li>
                                    <li>Github Action, Jenkins를 기반으로 자동 배포 CI/CD 구성</li>
                                    <li>자체 DNS / 네임서버 구성 및 운영</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">블로그</p>
                                <p className="mt-4">2022.01 - 2022.03</p>
                                <p className="leading-3 font-thin">Main Developer, Author</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">
                                    <a href="https://github.com/zodaland/blog" target="_blank">
                                        https://github.com/zodaland/blog
                                    </a>
                                </p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>개인 블로그 개발 및 운영</li>
                                    <li>로그 및 에러 알람 메일을 통한 적극적인 이슈 관리</li>
                                    <li>SEO 최적화 및 구글 검색엔진 등록</li>
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
                                    <li>GraphQL 기반의 회사소개 사이드 프로젝트</li>
                                    <li>
                                        Schema 추가 코드가 필요없는 자동 추가 환경을 구축하여 작업
                                    </li>
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
                                <p className="text-3xl font-bold">MollTalk</p>
                                <p className="mt-4">2021.02 - 2022.04</p>
                                <p className="leading-3 font-thin">Main Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">
                                    <a href="https://github.com/zodaland/molltalk" target="_blank">
                                        https://github.com/zodaland/molltalk
                                    </a>
                                </p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>웹 채팅 사이드 프로젝트</li>
                                    <li>
                                        웹 소켓을 통한 CLI 접속 환경 및 실시간 채팅, 알림, 초대 기능
                                        구현
                                    </li>
                                    <li>테스트 코드 도입으로 안정성 향상</li>
                                    <li className="ml-5">coverage: 49.02%</li>
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
                                <p className="leading-3 font-thin">Graduate</p>
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
                </div>
            </div>
        </>
    );
};

export default ResumePage;
