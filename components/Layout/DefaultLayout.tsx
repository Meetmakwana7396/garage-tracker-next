import App from '@/App';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { IRootState } from '@/store/store';
import Header from './Header';
import { toggleSidebar } from '@/store/siteViewSlice';
interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const themeConfig = useSelector((state: IRootState) => state.site);
    const dispatch = useDispatch();


    return (
        <App>
            <div className="relative">
                {/* BEGIN SIDEBAR */}

                <div
                    className={`${
                        (!themeConfig?.sidebar && 'hidden') || ''
                    } fixed inset-0 z-50 bg-[black]/60 lg:hidden`}
                    onClick={() => dispatch(toggleSidebar())}
                ></div>

                <div className={`${themeConfig?.navbar} main-container min-h-screen text-black dark:text-white-dark`}>
                    <Sidebar />
                    {/* BEGIN CONTENT AREA */}
                    <div className="main-content">
                        <Header />
                        <div className="p-6">{children}</div>
                        <Footer />
                    </div>
                </div>
                {/* END CONTENT AREA */}
            </div>
        </App>
    );
};

export default DefaultLayout;
