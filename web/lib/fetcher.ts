import { ErrorWithStatus } from '../interfaces';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = async (url: string, addedOptions?: RequestInit) => {
    const headers = addedOptions?.headers ?? undefined;
    const res = await fetch(`${apiUrl}${url}`, {
        mode: 'cors',
        credentials: 'same-origin',
        ...addedOptions,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    });
    if (!res.ok) {
        const error = new ErrorWithStatus();
        error.status = res.status;
        throw error;
    }
    const contentType = res.headers.get('Content-Type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
    } else {
        return res.text();
    }
};
