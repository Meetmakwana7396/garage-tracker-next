import { FC } from 'react';
import IconLoaderDots from '../Icon/IconLoaderDots';

interface LoadingProps {
    message?: string;
}

const Loading: FC<LoadingProps> = ({ message }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex min-h-[100vh] w-full flex-col items-center justify-center bg-white dark:bg-black">
            <div>
                <IconLoaderDots className="w-16 text-black dark:text-white"/>
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
        </div>
    );
};

export default Loading;
