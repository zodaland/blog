import React, { useState } from 'react';

import { fetcher } from '../../lib/fetcher';

import { useAppDispatch } from '../../redux/hooks';
import { setToken } from '../../redux/modules/tokenSlice';

const Login = () => {
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { token } = await fetcher('/auth', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });
        dispatch(setToken(token));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    className="px-3 py-2 bg-white border border-gray-300 focus:border-sky-500 focus:outline-none rounded-md text-sm"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Login;
