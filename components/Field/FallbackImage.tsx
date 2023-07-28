import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface FallbackImageProps {
    src: string;
    fallbackSrc?: string | undefined;
    alt: string;
    [key: string]: any; // Allows for additional props
}

const FallbackImage = ({ src, fallbackSrc, alt, ...rest }: FallbackImageProps) => {
    const [imgSrc, set_imgSrc] = useState<any>(src);

    useEffect(() => {
        set_imgSrc(src);
    }, [src]);

    return (
        <Image
            {...rest}
            src={imgSrc}
            onLoadingComplete={(result) => {
                if (result.naturalWidth === 0) {
                    set_imgSrc(fallbackSrc);
                }
            }}
            onError={() => {
                set_imgSrc(fallbackSrc);
            }}
            alt={alt}
        />
    );
};

export default FallbackImage;
