import { IRootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { toggleSidebar } from '@/store/authSlice';
import IconLogout from '../Icon/IconLogout';
import IconUser from '../Icon/IconUser';
import Pop from '../Essentials/Pop';
import IconMenu from '../Icon/IconMenu';

const Header = (props: any) => {
    const themeConfig = useSelector((state: IRootState) => state.auth);
    const { logout } = useAuth();
    const dispatch = useDispatch();
    const { user, sidebar } = useSelector((state: IRootState) => state.auth);

    return (
        <header className={themeConfig?.semidark && themeConfig?.menu === 'horizontal' ? 'dark' : ''}>
            <div>
                <div className="relative flex w-fill justify-between items-center bg-transparent px-5 py-2.5 dark:bg-black">
                    <div className="flex items-center gap-3">
                        {
                            <span
                                onClick={() => dispatch(toggleSidebar())}
                                className={`cursor-pointer hover:bg-black-light rounded-full rotate-180 p-2 lg:hidden ${
                                    sidebar && 'lg:hidden'
                                }`}
                            >
                                <IconMenu />
                            </span>
                        }
                        {/* <p className="font-semibold tracking-widest text-black text-lg">{props.title || 'title'}</p> */}
                    </div>
                    <div className="flex items-center space-x-1.5 ml-auto dark:text-[#d0d2d6] lg:space-x-2">
                        <div className="dropdown flex shrink-0">
                            {/* <Dropdown
                                offset={[0, 8]}
                                placement="bottom-end"
                                btnClassName="relative group block"
                                button={
                                    <Image
                                        className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src="/assets/images/user-profile.png"
                                        height={36}
                                        width={36}
                                        alt="userProfile"
                                    />
                                }
                            >
                                <ul className="w-[230px] shadow-none !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <Image
                                                className="h-10 w-10 rounded-md object-cover"
                                                height={40}
                                                width={40}
                                                src="/assets/images/user-profile.png"
                                                alt="userProfile"
                                            />
                                            <div className="truncate ltr:pl-4 rtl:pr-4">
                                                <h4 className="text-base">{user?.first_name}</h4>
                                                <button
                                                    type="button"
                                                    className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                >
                                                    {user?.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/profile" className="dark:hover:text-white">
                                            <IconUser className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <button className="!py-3 text-danger" onClick={logout}>
                                            <IconLogout className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 rotate-180" />
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </Dropdown> */}
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
                                <ul className="!py-0 font-semibold text-sm text-dark dark:text-white-dark dark:text-white-light/90">
                                    <li className="p-3 hover:bg-supporting">
                                        <Link
                                            href="/profile"
                                            className="dark:hover:text-white flex items-center text-gray-400"
                                        >
                                            <IconUser className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2" />
                                            Profile
                                        </Link>
                                    </li>

                                    <li className="border-t p-3 border-white-light dark:border-white-light/10 opacity-70 hover:bg-danger/10">
                                        <button className="text-danger flex items-center" onClick={logout}>
                                            <IconLogout className="shrink-0 w-5 h-5 ltr:mr-2 rtl:ml-2 rotate-180" />
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </Pop>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
