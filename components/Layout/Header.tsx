import { IRootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import IconLogout from '../Icon/IconLogout';
import IconUser from '../Icon/IconUser';
import Pop from '../Essentials/Pop';
import IconMenu from '../Icon/IconMenu';
import { toggleSidebar, toggleTheme } from '@/store/siteViewSlice';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import PopButton from '../Essentials/PopButton';
import { useRouter } from 'next/router';

const Header = (props: any) => {
    const themeConfig = useSelector((state: IRootState) => state.site);
    const { sidebar, isDarkMode } = useSelector((state: IRootState) => state.site);
    const router = useRouter();
    const { logout } = useAuth();
    const dispatch = useDispatch();

    return (
        <header className={themeConfig?.semidark && themeConfig?.menu === 'horizontal' ? 'dark' : ''}>
            <div className="flex w-fill justify-between items-center px-5 py-3">
                <div className="flex items-center gap-3">
                    {
                        <span
                            onClick={() => dispatch(toggleSidebar())}
                            className={`cursor-pointer hover:bg-black-supporting/10 rounded-full rotate-180 p-2 lg:hidden ${
                                sidebar && 'lg:hidden'
                            }`}
                        >
                            <IconMenu />
                        </span>
                    }
                </div>
                <div className="flex items-center gap-2 ml-auto dark:text-[#d0d2d6] lg:space-x-2">
                    <div className="dark:text-white-dark cursor-pointer">
                        {isDarkMode ? (
                            <span onClick={() => dispatch(toggleTheme('light'))}>
                                <IconSun className=" rounded-full w-8 h-8 p-1 hover:bg-white/20 hover:text-white" />
                            </span>
                        ) : (
                            <span onClick={() => dispatch(toggleTheme('dark'))}>
                                <IconMoon className="text-white-dark rounded-full hover:bg-black/20 hover:text-black w-8 h-8 p-1" />
                            </span>
                        )}
                    </div>
                    <div className="dropdown flex shrink-0">
                        <Pop
                            button={
                                <Image
                                    className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    src="/assets/images/user-profile.png"
                                    height={36}
                                    width={36}
                                    alt="userProfile"
                                />
                            }
                            width="w-[150px]"
                        >
                            <PopButton onClick={() => router.push('/profile')}>
                                <div className="flex items-center">
                                    <IconUser className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                    Profile
                                </div>
                            </PopButton>
                            <PopButton onClick={logout} className="text-danger flex hover:bg-danger/20  items-center">
                                <div className="flex">
                                    <IconLogout className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 rotate-180" />
                                    Log Out
                                </div>
                            </PopButton>
                        </Pop>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
