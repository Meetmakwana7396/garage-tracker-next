import clsx from 'clsx';
import Link from 'next/link';
import { FC, ReactElement, ReactNode } from 'react';

interface INavLink {
    href: string;
    icon: ReactElement;
    children: ReactNode;
    active?: boolean;
    target?: string;
    rel?: string;
}

const NavLink: FC<INavLink> = ({ href, icon, children, active, target, rel }) => {
    return (
        <Link href={href} target={target} rel={rel}>
            <div
                className={clsx(
                    'flex gap-6 py-2 px-6 items-center group text-lg',
                    active && 'font-bold border-r-4 border-primary'
                )}
            >
                <span className={clsx(!!active ? 'text-primary' : ' group-hover:text-gray-500')}>{icon}</span>
                <span className={clsx(!!active ? 'text-primary' : ' group-hover:text-gray-500')}>{children}</span>
            </div>
        </Link>
    );
};

export default NavLink;
