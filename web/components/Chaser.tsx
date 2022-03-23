import { useRef, useEffect, useState } from 'react';

import { useAppSelector } from '../redux/hooks';

import { ChaserProps } from '../interfaces';

const Chaser = ({ subject, className, children }: ChaserProps) => {
    const scrollY = useAppSelector((state) => state.scrollY);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const boundaryY = 70;
            const elementOriginY = ref.current.offsetTop;
            const element = ref.current.childNodes[0] as HTMLElement;
            const parentElement = ref.current.parentNode as HTMLElement;
            const marginTop = scrollY - elementOriginY + boundaryY;
            const elementBottom = element.offsetHeight + elementOriginY + marginTop;
            const parentBottom = parentElement.offsetHeight + elementOriginY;
            if (elementBottom > parentBottom) return;
            if (scrollY > elementOriginY - boundaryY) {
                element.style.marginTop = marginTop + 'px';
            } else {
                element.style.marginTop = '';
            }
        };
        handleScroll();
    }, [scrollY]);

    return (
        <section className={className} ref={ref}>
            <div className="w-4/5 max-w-xs px-5 space-y-6">
                <h3 className="font-semibold tracking-widest text-center ml-3">{subject}</h3>
                <div
                    className={'opacity-30 duration-150 ' + (isFocus ? '!opacity-100' : '')}
                    onMouseEnter={() => setIsFocus(true)}
                    onMouseLeave={() => setIsFocus(false)}
                >
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Chaser;
