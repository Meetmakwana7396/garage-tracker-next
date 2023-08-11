import { IIcon } from '@/types/auth';
import clsx from 'clsx';

const IconMoveLeft = ({ className }: IIcon) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={clsx('lucide lucide-move-left', className)}
        >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
        </svg>
    );
};

export default IconMoveLeft;
