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
            <div
                className={clsx(
                    'flex gap-6 p-3 items-center hover:text-secondary rounded',
                    active && 'text-secondary font-bold bg-light/10'
                )}
            >
                <span className="text-xl">{icon}</span>
                <span>{children}</span>
            </div>
        </Link>
    );
};

export default NavLink;
