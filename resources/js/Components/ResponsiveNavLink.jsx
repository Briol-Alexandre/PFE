import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center justify-center py-2 px-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none uppercase tracking-wider ${active
                ? 'text-brand-green hover:text-brand-green/80'
                : 'text-brand hover:text-brand/80'
                } ${className}`}
        >
            {children}
        </Link>
    );
}
