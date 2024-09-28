import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import style from "./auth.module.css"
import { FaUser } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className={style.container}>
            <div className={style.sidebar}>
                <div>
                    <div>
                        <FaUser size={30} />
                    </div>
                    <div>
                        <h2>{user.name}</h2>
                    </div>
                </div>
                <div>
                    <Link href={route("dashboard")} data-active={route().current('dashboard') ? "true" : "false"}>
                        <div>
                            <MdOutlineSpaceDashboard />
                        </div>
                        <h2>
                            Dashboard
                        </h2>
                    </Link>
                    {
                        user.role == "admin" && <>
                            <Link href={route('kelompok.index')} data-active={route().current('kelompok.index') ? "true" : "false"}>
                                <div>
                                    <MdOutlineSpaceDashboard />
                                </div>
                                <h2>
                                    Kelompok Tani
                                </h2>
                            </Link>
                            <Link href={route('users.index')} data-active={route().current('users.index')}>
                                <div>
                                    <MdOutlineSpaceDashboard />
                                </div>
                                <h2>
                                    Users
                                </h2>
                            </Link>
                            <Link href={route('berita.index')} data-active={route().current('berita.index')}>
                                <div>
                                    <MdOutlineSpaceDashboard />
                                </div>
                                <h2>
                                    Berita
                                </h2>
                            </Link>
                        </>
                    }

                </div>
            </div>

            <div className={style.nav}>
                <div>
                    <h2>Aplikasi Pendataan Kelompok Tani Kabupaten Enrekang</h2>
                </div>
                <div data-active={showingNavigationDropdown ? "true" : "false"} onClick={() => {
                    setShowingNavigationDropdown(el => !el)
                }} >
                    <h3>{user.username}</h3>
                    <IoMdArrowDropdown />
                    <div data-active={showingNavigationDropdown ? "true" : "false"}>
                        <Link href={route("logout")} method='post'>
                            <IoLogOut />
                            <h4>Logout</h4>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={style.main}>
                {children}
            </div>

        </div>
        // <div className="min-h-screen bg-gray-100">
        //     <nav className="bg-white border-b border-gray-100">
        //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        //             <div className="flex justify-between h-16">
        //                 <div className="flex">
        //                     <div className="shrink-0 flex items-center">
        //                         <Link href="/">
        //                             {/* <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" /> */}
        //                         </Link>
        //                     </div>

        //                     <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
        //                         <NavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                             Dashboard
        //                         </NavLink>
        //                         {
        //                             user.role == "admin" && <>
        //                                 <NavLink href={route('kelompok.index')} active={route().current('kelompok')}>
        //                                     Kelompok Tani
        //                                 </NavLink>
        //                                 <NavLink href={route('users.index')} active={route().current('users')}>
        //                                     Users
        //                                 </NavLink>
        //                                 <NavLink href={route('berita.index')} active={route().current('berita')}>
        //                                     Berita
        //                                 </NavLink>
        //                             </>
        //                         }
        //                     </div>
        //                 </div>

        //                 <div className="hidden sm:flex sm:items-center sm:ms-6">
        //                     <div className="ms-3 relative">
        //                         <Dropdown>
        //                             <Dropdown.Trigger>
        //                                 <span className="inline-flex rounded-md">
        //                                     <button
        //                                         type="button"
        //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
        //                                     >
        //                                         {user.name}

        //                                         <svg
        //                                             className="ms-2 -me-0.5 h-4 w-4"
        //                                             xmlns="http://www.w3.org/2000/svg"
        //                                             viewBox="0 0 20 20"
        //                                             fill="currentColor"
        //                                         >
        //                                             <path
        //                                                 fillRule="evenodd"
        //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                                                 clipRule="evenodd"
        //                                             />
        //                                         </svg>
        //                                     </button>
        //                                 </span>
        //                             </Dropdown.Trigger>

        //                             <Dropdown.Content>
        //                                 {
        //                                     user.role == "admin" && <>
        //                                         {/* <Dropdown.Link href={route('users.index')}>Profile</Dropdown.Link> */}
        //                                         {/* <Dropdown.Link href={route('berita.index')}>Berita</Dropdown.Link> */}
        //                                     </>
        //                                 }
        //                                 <Dropdown.Link href={route('logout')} method="post" as="button">
        //                                     Log Out
        //                                 </Dropdown.Link>
        //                             </Dropdown.Content>
        //                         </Dropdown>
        //                     </div>
        //                 </div>

        //                 <div className="-me-2 flex items-center sm:hidden">
        //                     <button
        //                         onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
        //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
        //                     >
        //                         <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        //                             <path
        //                                 className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M4 6h16M4 12h16M4 18h16"
        //                             />
        //                             <path
        //                                 className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth="2"
        //                                 d="M6 18L18 6M6 6l12 12"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
        //             <div className="pt-2 pb-3 space-y-1">
        //                 <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
        //                     Dashboard
        //                 </ResponsiveNavLink>
        //             </div>

        //             <div className="pt-4 pb-1 border-t border-gray-200">
        //                 <div className="px-4">
        //                     <div className="font-medium text-base text-gray-800">
        //                         {user.name}
        //                     </div>
        //                     <div className="font-medium text-sm text-gray-500">{user.username}</div>
        //                 </div>

        //                 <div className="mt-3 space-y-1">
        //                     {
        //                         user.role == "admin" && <>
        //                             <ResponsiveNavLink href={route('kelompok.index')}>Kelompok</ResponsiveNavLink>
        //                             <ResponsiveNavLink href={route('users.index')}>Users</ResponsiveNavLink>
        //                             <ResponsiveNavLink href={route('berita.index')}>Berita</ResponsiveNavLink>
        //                         </>
        //                     }

        //                     <ResponsiveNavLink method="post" href={route('logout')} as="button">
        //                         Log Out
        //                     </ResponsiveNavLink>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     {header && (
        //         <header className="bg-white shadow">
        //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        //         </header>
        //     )}

        //     <main>{children}</main>
        // </div>
    );
}