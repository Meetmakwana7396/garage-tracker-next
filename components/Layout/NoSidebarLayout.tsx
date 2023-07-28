import { ReactNode } from 'react';

interface NoSidebarLayoutProps {
    children: ReactNode;
}

const NoSidebarLayout = ({ children }: NoSidebarLayoutProps) => {
    return <div className="font-inter bg-[#F5F7FA] text-base leading-5 text-black antialiased">{children}</div>;
};

export default NoSidebarLayout;
