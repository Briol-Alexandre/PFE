import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen items-center bg-[url('/img/background.jpg')] bg-cover pt-6 justify-between sm:pt-0">
            <div>
                <Link href="/" className="flex items-center justify-center">
                    <ApplicationLogo className="max-w-[900px] h-24 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="flex items-center justify-center h-screen overflow-hidden bg-black px-6 py-4 w-1/2">
                {children}
            </div>
        </div>
    );
}
