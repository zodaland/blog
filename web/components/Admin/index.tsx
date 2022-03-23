import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Timer from './Timer';
import BoardEditComponent from './BoardEditComponent';
import MainEditComponent from './MainEditComponent';
import SubMenuComponent from './SubMenuComponent';

import { useAppSelector } from '../../redux/hooks';

import { fetcher } from '../../lib/fetcher';

const Admin = () => {
    const token = useAppSelector((state) => state.token);
    const router = useRouter();

    useEffect(() => {
        const ping = async () => {
            try {
                await fetcher('/auth', { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                router.replace('/');
            }
        };
        ping();
    });

    const [menu, setMenu] = useState<string>('board');

    return (
        <>
            <Timer />
            <SubMenuComponent menu={menu} setMenu={setMenu} />
            {(() => {
                switch (menu) {
                    case 'board':
                        return <BoardEditComponent />;
                    case 'main':
                        return <MainEditComponent />;
                }
            })()}
        </>
    );
};

export default Admin;
