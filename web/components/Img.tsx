import { useState, useEffect } from 'react';
import Image, { ImageLoaderProps } from 'next/image';

import Loading from './Loading';

import { ImageProps } from '../interfaces';

const Img = ({ file }: ImageProps) => {
    const [src, setSrc] = useState<string>(file);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const loader = ({ src }: ImageLoaderProps) => `${process.env.NEXT_PUBLIC_IMAGE_URL}${src}`;

    useEffect(() => {
        setSrc(file);
    }, [file]);
    return (
        <>
            <div className="relative w-full h-full">
                <Image
                    src={src}
                    loader={loader}
                    layout="fill"
                    onError={() => setSrc('error.jpg')}
                    onLoad={() => setIsLoad(true)}
                />
                <Loading className={isLoad ? 'hidden' : ''} />
            </div>
        </>
    );
};

export default Img;
