
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col gap-10 min-h-screen items-center bg-[url('/img/background.jpg')] bg-cover pt-6 justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex items-center justify-center">
                    <img src="/img/logo.svg" alt="Logo" className="xl:max-w-[900px] md:max-w-[600px] max-w-[300px] h-24" />
                </Link>
            </div>

            <div className="flex items-center justify-center overflow-hidden px-6 py-4 rl:w-1/2">
                {children}
            </div>
        </div>
    );
}
