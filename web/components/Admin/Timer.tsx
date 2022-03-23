import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAppSelector } from '../../redux/hooks';

const Timer = () => {
    const router = useRouter();

    const token = useAppSelector((state) => state.token);
    const [timer, setTimer] = useState<string>('');
    const expireRef = useRef<number>(0);
    let intervalId: number;

    useEffect(() => {
        const activateTimer = () => {
            if (document.hidden) return;
            const payload = token.split('.')[1];
            const decoded = JSON.parse(window.atob(payload));
            const time = Math.floor(new Date().getTime() / 1000);
            expireRef.current = decoded.exp - time;

            if (expireRef.current < 0) {
                router.replace('/');
                return;
            }
            if (intervalId) clearInterval(intervalId);
            intervalId = window.setInterval(() => {
                const min = Math.floor(expireRef.current / 60);
                const sec = expireRef.current % 60;
                expireRef.current--;
                setTimer(`${min}분 ${sec}초`);
            }, 1000);
        };
        activateTimer();
        document.addEventListener('visibilitychange', activateTimer);

        return () => {
            document.removeEventListener('visibilitychange', activateTimer);
        };
    }, []);
    return (
        <div className="md:absolute md:top-6 md:left-52 mb-6">
            <span>{timer}</span>
        </div>
    );
};

export default Timer;
