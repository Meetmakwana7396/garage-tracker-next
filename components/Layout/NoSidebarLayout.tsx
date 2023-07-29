import { ReactNode } from 'react';

interface NoSidebarLayoutProps {
    children: ReactNode;
}

const NoSidebarLayout = ({ children }: NoSidebarLayoutProps) => {
    return <div className="font-inter bg-supporting text-base leading-5 text-black antialiased">{children}</div>;
};

export default NoSidebarLayout;
