import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import ULTextSection from '../Components/welcome-page/ul-text-section';
import ScrollbarCustom from '../Components/tools/ScrollBar';
import ScrollImage from '../Components/welcome-page/Scroll-image';

export default function Welcome({ auth }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/logo.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Head title="WatchOut - Ne laissez pas le temps abîmer vos montres" />
            <ScrollbarCustom />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <header className="flex flex-col items-center justify-center w-full">
                    <object id="svg-logo" type="image/svg+xml" data="/img/logo.svg" className="max-w-[900px] z-10"></object>
                    <p className="text-center xl:text-7xl text-5xl font-erstoria text-brand pt-16 w-1/2">
                        Ne laissez pas le temps abîmer vos montres
                    </p>
                    <div className="flex gap-8 mt-8 font-just-sans">
                        {auth && auth.user ? (
                            <Link href="/dashboard" className="hover-underline text-2xl">
                                <span>Dashboard</span>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hover-underline text-2xl font-light">
                                    <span>Se connecter</span>
                                </Link>
                                <Link href="/register" className="hover-underline text-2xl font-light">
                                    <span>Créer un compte</span>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
                <ScrollImage />
            </div>
            <ULTextSection />
        </>
    );
}

