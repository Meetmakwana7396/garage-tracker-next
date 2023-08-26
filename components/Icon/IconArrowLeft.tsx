import { IIcon } from '@/types/auth';
import clsx from 'clsx';

const IconArrowLeft = ({ className }: IIcon) => {
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
            className={clsx('lucide lucide-arrow-left', className)}
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    );
};

export default IconArrowLeft;
