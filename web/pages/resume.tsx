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
                    <div className="flex md:flex-row flex-col mt-10">
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
                    <h1 className="text-5xl font-bold mt-10 mb-14 md:ml-0 ml-1">
                        Introduce<span className="text-sky-300">,</span>
                    </h1>
                    <div className="mt-8 pl-2">
                        <ul className="ml-7 list-square list-outside divide-y-8 divide-transparent">
                            <li className="mt-5 ml-5 mr-2 md:text-2xl text-xl">
                                3년차 개발자로서 <span className="hl">도메인 시스템</span>을 개발,
                                배포 및 운영했습니다.
                            </li>
                            <li className="mt-5 ml-5 mr-2 md:text-2xl text-xl">
                                서버 관리부터 다양한 프로젝트, 배포를 진행하여 전체적인 프로젝트
                                생명주기 및 비즈니스 모델 성장에 대한 이해력을 길렀습니다.
                            </li>
                            <li className="mt-5 ml-5 mr-2 md:text-2xl text-xl">
                                최근에는 <span className="hl">코어 통신 시스템 개편 프로젝트</span>
                                의 설계/개발/배포를 전담하였고 평균 처리 속도를 약{' '}
                                <span className="hl">93%</span> 개선하였습니다.
                            </li>
                            <li className="mt-5 ml-5 mr-2 md:text-2xl text-xl">
                                어떠한 환경에서든 빠르게 적응하며 능동적으로 업무를 수행할 수
                                있습니다. 또한, 좋은 동료가 되기 위해 소통에 관심을 가지고
                                노력합니다.
                            </li>
                        </ul>
                    </div>
                    {/*<div className="pt-72" />*/}
                    <h1 className="text-5xl font-bold mt-28 mb-14 md:ml-0 ml-1">
                        Experience<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:ml-0 ml-3">
                        <div className="flex md:flex-row flex-col">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">커넥트웨이브</p>
                                <p className="mt-4">2020.04 - 2023.</p>
                                <p className="leading-3 font-thin">Web Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">연 매출 3400억의 중견 IT기업</p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>
                                        <span className="hl">JAVA</span> 기반의 백엔드 도메인 통신
                                        시스템과 <span className="hl">PHP</span>기반의 웹 서비스
                                        개발 전담
                                    </li>
                                    <li>Index와 쿼리 튜닝을 통한 slow query 개선 경험</li>
                                    <li className="ml-5">
                                        평균 로딩 속도 <span className="hl">1.51초</span> →{' '}
                                        <span className="hl">0.35초</span>
                                    </li>
                                </ul>
                                <div className="mt-8">
                                    <p className="text-2xl font-bold">
                                        도메인 코어 통신 시스템 개편
                                    </p>
                                    <p className="mt-2">2022.06 - 2023.03</p>
                                    <div className="mt-2">
                                        <ul className="ml-5 list-square list-outside divide-y-4 divide-transparent">
                                            <li>
                                                23개의 레거시 분산 모듈을 하나의 시스템으로
                                                <span className="hl">재설계 및 개발 전담</span>
                                            </li>
                                            <li>
                                                3개의 SDK와 11개의 요청 서버, 최대 24개의 커맨드
                                                처리를 위한 파사드 패턴 도입으로 보일러 플레이트
                                                코드 대폭 감소
                                            </li>
                                            <li>
                                                SDK 마다 다른 명령어를 하나의 시스템에서 처리하기
                                                위한 커맨드 패턴, XML 확장성 공급을 위한 전략 패턴
                                                도입
                                            </li>
                                            <li>
                                                BlockingQueue를 이용한{' '}
                                                <span className="hl">세션 풀</span> 및{' '}
                                                <span className="hl">스레드 동기화</span>
                                                구현
                                            </li>
                                            <li>
                                                TCP 소켓 통신 모듈에서 간단한 REST로 변경, API
                                                명세서 작성
                                            </li>
                                            <li>
                                                리셀러 활성화를 위해 Spring Security를 도입, 내부
                                                통신에서 IP 화이트 리스트, 역할, Basic
                                                Authentication 기반의 외부 통신 API로 변경
                                            </li>
                                            <li>
                                                평균 응답속도 <span className="hl">43.31%</span>,
                                                평균 초당 처리 개수 <span className="hl">93%</span>{' '}
                                                향상
                                            </li>
                                            <li>기술 스택</li>
                                            <li className="ml-5">
                                                Java, Spring Boot, Spring Security, MySQL, JPA,
                                                Maven
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <p className="text-2xl font-bold">DNS 자동화</p>
                                    <p className="mt-2">2022.01 - 2022.06</p>
                                    <div className="mt-2">
                                        <ul className="ml-5 list-square list-outside divide-y-4 divide-transparent">
                                            <li>
                                                수동 DNS 기능 전체 호환을 위한{' '}
                                                <span className="hl">DB, 구조 설계 및 개발</span>
                                            </li>
                                            <li>
                                                서비스 전반에 분산되어 있던 함수 기반의 기능을
                                                <span className="hl">클래스 기반</span>으로 작성
                                            </li>
                                            <li>사용자, 관리자 화면 작성</li>
                                            <li>
                                                시스템 통합 및 자동화로 운영팀 및 개발팀 업무 효율성
                                                상승
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="pt-80" />*/}
                    <h1 className="text-5xl font-bold mt-28 mb-14 md:ml-0 ml-1">
                        Side Projects<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:mx-0 mx-3">
                        <div className="flex md:flex-row flex-col mb-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">개인 서버</p>
                                <p className="mt-4">2020.08 - 2023.</p>
                                <p className="leading-3 font-thin">root</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin"></p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>서버 세팅부터 개발, 관리 등 전반적인 운영</li>
                                    <li>
                                        최소한의 서버 구성과 <span className="hl">Docker</span>{' '}
                                        컨테이너 사용을 최대화한 인프라 구성
                                    </li>
                                    <li className="ml-5">
                                        Nginx, Java/Spring, Node.js, php-fpm, MySQL, MongoDB, Redis,
                                        Jenkins, Certbot, Mail Server/Client 등의{' '}
                                        <span className="hl">컨테이너 구축 및 운영</span> 경험
                                    </li>
                                    <li className="ml-5">
                                        <span className="hl">Docker Compose</span>를 사용한 다중
                                        컨테이너 관리
                                    </li>
                                    <li>
                                        서버, WAS, 서비스 각각의 로그 관리와 자동 알람 처리를 통한
                                        이슈 관리
                                    </li>
                                    <li>
                                        실제 공격(SSH Brute force Attack, kdevtmpfsi, SYN Flooding
                                        등)을 받은 경험을 바탕으로 기른 보안 개념
                                    </li>
                                    <li className="ml-5">방화벽 관리, Nmap을 이용한 보안 강화</li>
                                    <li className="ml-5">
                                        <span className="hl">Jenkins</span>와 Webhook 이용한 서버
                                        OTP 로그인 인증 환경 구성
                                    </li>
                                    <li>
                                        Jenkins, ShellScript를 사용한 Let's Encrypt 와일드카드
                                        도메인 인증서 자동 갱신 환경 구축
                                    </li>
                                    <li>
                                        Github Action, Jenkins를 통한{' '}
                                        <span className="hl">CI/CD</span> 구성
                                    </li>
                                    <li>자체 DNS / 네임서버 구성 및 운영</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-4 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">마륜정</p>
                                <p className="mt-4">2022.08 - 2023.</p>
                                <p className="leading-3 font-thin">Main Developer</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin"></p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>온라인 잡지 상품 판매 쇼핑몰</li>
                                    <li>백엔드 / 프론트엔드 개발 전담</li>
                                    <li>
                                        개별 인증을 통한 일회성 접근 URL과 IAM, S3를 통한 이미지와
                                        1:1 매핑되는 pre-signed URL을 이용해 웹 잡지 상품 구현
                                    </li>
                                    <li>
                                        스크래핑을 통해 매 주 갱신되는 일정 정보에 따른 자동 상품
                                        갱신 시스템 구축
                                    </li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">BackEnd</li>
                                    <li className="ml-10">
                                        Java, Spring Boot, Spring Security, MySQL, JPA, Querydsl,
                                        AWS S3/CloudFront, EC2, SENS SMS
                                    </li>
                                    <li className="ml-5">FrontEnd</li>
                                    <li className="ml-10">
                                        TypeScript, Next.js, React-admin, Redux, SWR
                                    </li>
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
                                    <li>
                                        마크다운 기반의 게시글 작성, 커스텀 된 마크업 게시물로
                                        보여지는 개발 기록 블로그
                                    </li>
                                    <li>백엔드 / 프론트엔드 개발 전담</li>
                                    <li>
                                        카테고리, 태그의 추가 / 수정이 용이한 블로그 페이지 구현
                                    </li>
                                    <li>
                                        개인 메일서버를 연동한 컨택트 페이지와 OTP + 패스워드 보안의
                                        관리자 페이지 구현
                                    </li>
                                    <li>
                                        SEO 최적화 및 구글 검색엔진 등록, 2023년 2월 기준{' '}
                                        <span className="hl">MAU 1,855명</span>
                                    </li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">BackEnd</li>
                                    <li className="ml-10">
                                        TypeScript, NestJS, Jest, MySQL, TypeORM, winston
                                    </li>
                                    <li className="ml-5">FrontEnd</li>
                                    <li className="ml-10">
                                        TypeScript, Next.js, Redux, TOAST UI, reCAPTCHA, SWR,
                                        winston
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
                                    <li>
                                        <span className="hl">GraphQL</span> 기반의 회사소개 사이드
                                        프로젝트
                                    </li>
                                    <li>
                                        Schema 추가 코드가 필요없는 자동 추가 환경을 구축하여 작업
                                    </li>
                                    <li>백엔드 / 프론트엔드 개발 전담</li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">BackEnd</li>
                                    <li className="ml-10">
                                        TypeScript, Express.js, GraphQL, MySQL, winston
                                    </li>
                                    <li className="ml-5">FrontEnd</li>
                                    <li className="ml-10">JavaScript, Next.js, Apollo</li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">MollTalk</p>
                                <p className="mt-4">2021.02 - 2021.04</p>
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
                                    <li>
                                        <span className="hl">테스트 코드</span> 작성으로 안정성 향상
                                    </li>
                                    <li>백엔드 / 개발 전담</li>
                                    <li>기술 스택</li>
                                    <li className="ml-5">BackEnd</li>
                                    <li className="ml-10">
                                        JavaScript, Express.js, Jest, Mongoose, MongoDB, MySQL
                                    </li>
                                    <li className="ml-5">FrontEnd</li>
                                    <li className="ml-10">JavaScript, WebSocket, React, Recoil</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*
                    <div className="p-24"></div>
                    <div className="pt-80" />
                    */}
                    <h1 className="text-5xl font-bold mt-28 mb-14 md:ml-0 ml-1">
                        Skill<span className="text-sky-300">,</span>
                    </h1>
                    <ul className="mt-4 md:ml-6 ml-8 list-square list-outside divide-y-8 divide-transparent">
                        <li className="text-2xl font-bold">Language</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Java</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">TypeScript</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">PHP</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">
                                Shell&nbsp;script
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">HTML/CSS</li>
                        </ul>
                        <li className="text-2xl font-bold">Framework</li>
                        <li className="md:ml-10 ml-5 text-2xl">Back End</li>
                        <ul className="grid grid-cols-3 list-square list-outside md:ml-10 ml-5 mb-5">
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Spring Boot</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">JPA</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Querydsl</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">
                                NestJS
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Express.js</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">TypeORM</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">CodeIgniter</li>
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
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">AWS</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2 border-0">
                                Ubuntu
                            </li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Jenkins</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">DNS</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Docker</li>
                            <li className="text-xl font-thin md:ml-10 ml-5 mt-2">Nginx</li>
                            <li className="md:col-span-1 col-span-2 text-xl font-thin md:ml-10 ml-5 mt-2">
                                Docker compose
                            </li>
                            <li className="md:col-span-1 col-span-2 text-xl font-thin md:ml-10 ml-5 mt-2">
                                Websocket/Socket.io
                            </li>
                        </ul>
                    </ul>
                    {/*<div className="pt-52" />*/}
                    <h1 className="text-5xl font-bold mt-28 mb-14 md:ml-0 ml-1">
                        Education<span className="text-sky-300">,</span>
                    </h1>
                    <div className="divide-y md:mx-0 mx-3 mb-20">
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">인덕대학교</p>
                                <p className="mt-4">2013.03 - 2020.02</p>
                                <p className="leading-3 font-thin">Graduation</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">컴퓨터소프트웨어학과</p>
                                <ul className="mt-4 ml-5 list-square list-outside divide-y-4 divide-transparent">
                                    <li>
                                        3년간 컴퓨터구조, OS, 서버, 네트워크, 자료구조, 웹
                                        프로그래밍 등의 과목을 공부했습니다.
                                    </li>
                                    <li>
                                        재학 중 2년 간의 여러가지 아르바이트, 1년 반 동안의 공사
                                        현장 일을 병행하다보니 졸업이 다소 늦어졌습니다.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex md:flex-row flex-col mb-8 pt-8">
                            <div className="md:w-1/4 w-full">
                                <p className="text-3xl font-bold">학점은행</p>
                                <p className="mt-4">2021.01 - 2022.12</p>
                                <p className="leading-3 font-thin">Graduation</p>
                            </div>
                            <div className="md:w-3/4 w-full">
                                <p className="h-9 pt-4 font-thin">컴퓨터공학</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResumePage;
