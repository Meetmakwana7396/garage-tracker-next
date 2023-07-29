import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
            <div className={clsx('flex gap-6 p-3 items-center group', active && 'font-bold')}>
                <span
                    className={clsx('text-xl', !!active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500')}
                >
                    {icon}
                </span>
                <span className={clsx(!!active ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500')}>
                    {children}
                </span>
            </div>
        </Link>
    );
};

export default NavLink;
