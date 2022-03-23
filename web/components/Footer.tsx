import { Activity, AtSign, GitHub } from 'react-feather';
import Link from 'next/link';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="flex items-center justify-center mb-5">
                <hr className="basis-1/3 border-t-2 border-solid border-black" />
                <Activity className="basis-14" />
                <hr className="basis-1/3 border-t-2 border-solid border-black" />
            </div>
            <div className="flex item-center justify-between md:w-2/3 w-3/4 mx-auto">
                <span className="text-lg">{year} © · zodaland.</span>
                <ul className="flex items-center space-x-7">
                    <Link href="/mail">
                        <a>
                            <li>
                                <AtSign className="w-7 h-7 hover:text-gray-300 transition duration-300" />
                            </li>
                        </a>
                    </Link>
                    <Link href="https://github.com/zodaland">
                        <a target="github">
                            <li>
                                <GitHub className="w-7 h-7 hover:text-gray-300 transition duration-300" />
                            </li>
                        </a>
                    </Link>
                </ul>
            </div>
        </footer>
    );
};
export default Footer;
