import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toggleMenu, toggleSidebar } from '@/store/authSlice';
import { IRootState } from '@/store/store';
import IconClose from '../Icon/IconClose';
import NavLink from '../Navlink';
import IconDashboard from '../Icon/IconDashboard';
import IconInventory from '../Icon/IconInventory';

const Sidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const semidark = useSelector((state: IRootState) => state.auth?.semidark);
    const { sidebar } = useSelector((state: IRootState) => state.auth);

    const isActive = (href: string) => {
        if (href === '/') {
            return router.pathname === href;
        }
        return router.pathname === href || router.pathname.startsWith(href);
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-[51] h-full min-h-screen w-56 border-r transition-all duration-300 ${
                    semidark ? 'text-white-dark' : ''
                }`}
            >
                <div
                    className={`${
                        sidebar ? 'flex' : 'hidden'
                    } lg:hidden absolute left-full top-0 w-16 justify-center text-white pt-5`}
                >
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => dispatch(toggleSidebar())}>
                        <IconClose />
                    </button>
                </div>
                <div className="h-full bg-supporting text-black ">
                    <div className="flex items-center sm:justify-center justify-between p-3">
                        <Link href="/" className="main-logo -ml-3 justify-center items-center flex h-auto">
                            {/* <Image
                                className="w-full h-auto object-cover flex-none"
                                src="/assets/images/logo.svg"
                                alt="logo"
                                width={32}
                                height={28}
                                priority
                                quality={100}
                            /> */}
                            Logo
                        </Link>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-3 mt-10 font-semibold">
                            <li>
                                <NavLink href="/" icon={<IconDashboard />} active={isActive('/')}>
                                    Dashboard
                                </NavLink>
                            </li>

                            {/* <li>
                                <NavLink href="/attorney" icon={<IconInventory />} active={isActive('/attorney')}>
                                    Attorneys
                                </NavLink>
                            </li>

                            <li>
                                <NavLink href="/specialty" icon={<IconInventory />} active={isActive('/specialty')}>
                                    Specialties
                                </NavLink>
                            </li> */}

                            <li>
                                <NavLink href="/inventory" icon={<IconInventory />} active={isActive('/inventory')}>
                                    Inventory
                                </NavLink>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
