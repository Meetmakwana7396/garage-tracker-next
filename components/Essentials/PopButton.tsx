import clsx from 'clsx';
import { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

const PopButton = ({ children, className, onClick }: IProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                'p-2 text-start rounded w-full',
                className ? className : ' hover:bg-black/10 dark:hover:bg-supporting/10 '
            )}
        >
            {children}
        </button>
    );
};

export default PopButton;
