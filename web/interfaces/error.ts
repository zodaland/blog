export class ErrorWithStatus extends Error {
    status: number = 500;
    redirect: string|null = null;
}

export interface IError {
    path: string;
    reason: string;
}