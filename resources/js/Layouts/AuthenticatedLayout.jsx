import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import ScrollBar from '@/Components/tools/ScrollBar';
import NotificationBadge from '@/Components/Notifications/NotificationBadge';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, notifications } = usePage().props;
    const user = auth.user;

    const unreadNotificationsCount = user.role === 'creator' && notifications && Array.isArray(notifications) ?
        notifications.filter(notification => notification.read_at === null).length : 0;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen text-white font-just-sans">
            <h1 className="sr-only">Col&MacArthur-Maintenance</h1>
            <nav className="py-10">
                <h2 className="sr-only">Navigation Principale</h2>
                <div className="rl:mx-20 mx-5">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex w-full items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href={route('dashboard')}>
                                    <img src="/img/logo.svg" alt="Logo" className="min-w-[200px] block h-12 w-auto" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 md:-my-px md:ms-10 md:flex justify-end items-center w-full">
                                <div className="group relative">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                    >
                                        <img src={`/img/svg/nav/dashboard/${route().current('dashboard') ? 'full' : 'empty'}.svg`} alt="Dashboard" className='w-6 h-6' />
                                    </NavLink>
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                        Tableau de bord
                                    </div>
                                </div>

                                {user.role === 'creator' ? (
                                    <div className="group relative">
                                        <NavLink
                                            href={route('watch.index')}
                                            active={route().current('watch.index')}
                                        >
                                            <img
                                                src={`/img/svg/nav/watch/${route().current('watch.index') ? 'full' : 'empty'}.svg`}
                                                alt="Vos montres"
                                                className="w-6 h-6"
                                            />
                                        </NavLink>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                            Vos montres
                                        </div>
                                    </div>
                                ) : (
                                    <div className="group relative">
                                        <NavLink
                                            href={route('collection.index')}
                                            active={route().current('collection.index')}
                                        >
                                            <img
                                                src={`/img/svg/nav/watch/${route().current('collection.index') ? 'full' : 'empty'}.svg`}
                                                alt="Votre collection"
                                                className="w-6 h-6"
                                            />
                                        </NavLink>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                            Votre collection
                                        </div>
                                    </div>
                                )}

                                <div className="group relative">
                                    <NavLink
                                        href={route('repair.index')}
                                        active={route().current('repair.index')}
                                    >
                                        <img
                                            src={`/img/svg/nav/repair/${route().current('repair.index') ? 'full' : 'empty'}.svg`}
                                            alt="Vos réparations"
                                            className="w-6 h-6"
                                        />
                                    </NavLink>
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                        Vos réparations
                                    </div>
                                </div>

                                {user.role === 'creator' && (
                                    <div className="group relative">
                                        <NavLink
                                            href={route('notifications.index')}
                                            active={route().current('notifications.index')}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={`/img/svg/nav/notifications/${route().current('notifications.index') ? 'full' : 'empty'}.svg`}
                                                    alt="Notifications"
                                                    className="w-6 h-6"
                                                />
                                                <NotificationBadge count={unreadNotificationsCount} />
                                            </div>
                                        </NavLink>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                            Notifications
                                        </div>
                                    </div>
                                )}

                                <div className="group relative">
                                    <NavLink
                                        href={route('calendar.index')}
                                        active={route().current('calendar.index')}
                                    >
                                        <img
                                            src={`/img/svg/nav/calendar/${route().current('calendar.index') ? 'full' : 'empty'}.svg`}
                                            alt="Calendrier"
                                            className="w-6 h-6"
                                        />
                                    </NavLink>
                                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                        Calendrier
                                    </div>
                                </div>
                                {user.role === 'creator' && (
                                    <div className="group relative">
                                        <NavLink
                                            href={route('users.index')}
                                            active={route().current('users.index')}
                                        >
                                            <img
                                                src={`/img/svg/nav/users/${route().current('users.index') ? 'full' : 'empty'}.svg`}
                                                alt="Utilisateurs"
                                                className="w-6 h-6"
                                            />
                                        </NavLink>
                                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 hidden group-hover:block bg-black/80 backdrop-blur-lg text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                            Utilisateurs
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="hidden md:ms-6 md:flex md:items-center mt-1">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                            >
                                                <img src={`/img/svg/nav/settings/${route().current('profile.edit') ? 'full' : 'empty'}.svg`} alt="Paramètres" className='w-6 h-6' />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        {user.role === 'creator' && (
                                            <Dropdown.Link
                                                href={route('profile.creator')}
                                            >
                                                Profil
                                            </Dropdown.Link>
                                        )}
                                        {user.role === 'user' && (
                                            <Dropdown.Link
                                                href={route('profile.edit')}
                                            >
                                                Profil
                                            </Dropdown.Link>
                                        )}
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Se deconnecter
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center md:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' md:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 border-t border-brand-green">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            Tableau de bord
                        </ResponsiveNavLink>
                        {user.role === 'creator' ? (
                            <ResponsiveNavLink
                                href={route('watch.index')}
                                active={route().current('watch.index')}
                            >
                                Vos montres
                            </ResponsiveNavLink>
                        ) : (
                            <ResponsiveNavLink
                                href={route('collection.index')}
                                active={route().current('collection.index')}
                            >
                                Votre collection
                            </ResponsiveNavLink>
                        )}
                        <ResponsiveNavLink
                            href={route('repair.index')}
                            active={route().current('repair.index')}
                        >
                            Vos réparations
                        </ResponsiveNavLink>
                        {user.role === 'creator' && (
                            <ResponsiveNavLink
                                href={route('notifications.index')}
                                active={route().current('notifications.index')}
                            >
                                Notifications {unreadNotificationsCount > 0 && (
                                    <span className="ml-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        {unreadNotificationsCount}
                                    </span>
                                )}
                            </ResponsiveNavLink>
                        )}
                        {user.role === 'creator' && (
                            <ResponsiveNavLink
                                href={route('users.index')}
                                active={route().current('users.index')}
                            >
                                Utilisateurs
                            </ResponsiveNavLink>
                        )}
                        <ResponsiveNavLink
                            href={route('calendar.index')}
                            active={route().current('calendar.index')}
                        >
                            Calendrier
                        </ResponsiveNavLink>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Se deconnecter
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav >

            {header && (
                <header className="">
                    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )
            }

            <main>{children}</main>
            <ScrollBar />
        </div >
    );
}
