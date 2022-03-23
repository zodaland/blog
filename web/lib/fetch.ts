import { ErrorWithStatus } from '../interfaces';

export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url: string) => {
    const res = await fetch(url, {
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        const error = new ErrorWithStatus();
        error.status = res.status;
        throw error;
    }

    return res.json();
};
