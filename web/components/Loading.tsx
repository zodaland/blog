import { RefreshCw } from 'react-feather';

import { ClassProps } from '../interfaces';

const Loading = ({ className }: ClassProps) => {
    return (
        <div className={'flex w-full h-full place-items-center ' + (className ? className : '')}>
            <RefreshCw className="h5 w5 animate-spin mx-auto" />
        </div>
    );
};

export default Loading;
