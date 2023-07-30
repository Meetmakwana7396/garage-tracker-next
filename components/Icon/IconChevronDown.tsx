import { IIcon } from '@/types/auth';
import clsx from 'clsx';

const IconChevronDown = ({ className }: IIcon) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={clsx('lucide lucide-chevron-down', className)}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export default IconChevronDown;
