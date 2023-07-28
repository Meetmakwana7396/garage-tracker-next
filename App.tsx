import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    toggleRTL,
    toggleTheme,
    toggleMenu,
    toggleLayout,
    toggleAnimation,
    toggleNavbar,
    toggleSemidark,
    toggleSidebar,
} from '@/store/authSlice';
import { IRootState } from './store/store';

function App({ children }: any) {
    const themeConfig = useSelector((state: IRootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig?.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig?.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig?.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig?.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig?.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig?.navbar));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig?.semidark));
        // dispatch(toggleSidebar());
    }, [
        dispatch,
        themeConfig?.theme,
        themeConfig?.menu,
        themeConfig?.layout,
        themeConfig?.rtlClass,
        themeConfig?.animation,
        themeConfig?.navbar,
        themeConfig?.locale,
        themeConfig?.semidark,
    ]);

    return (
        <div
            className={`${(themeConfig?.sidebar && 'toggle-sidebar') || ''} ${themeConfig?.menu} ${
                themeConfig?.layout
            } ${themeConfig?.rtlClass} main-section relative font-inter text-sm font-normal antialiased`}
        >
            {children}
        </div>
    );
}

export default App;
