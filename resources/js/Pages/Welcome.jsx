import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import ULTextSection from '../Components/welcome-page/ul-text-section';
import ScrollbarCustom from '../Components/tools/ScrollBar';
import ScrollImage from '../Components/welcome-page/Scroll-image';
import Breakpoints from '../Components/tools/Breakpoints';

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
            <Head title="Col&MacArthur-Maintenance - Ne laissez pas le temps abîmer vos montres" />
            <Breakpoints />
            <ScrollbarCustom />
            <div className="min-h-screen flex flex-col items-center justify-center max-md:px-4">
                <header className="flex flex-col items-center justify-center w-full">
                    <img src="/img/logo.svg" alt="Col&MacArthur-Maintenance" className="xl:max-w-[900px] md:max-w-[600px] max-w-[400px] z-10" />
                    <p className="text-center xl:text-6xl rl:text-5xl md:text-4.5xl text-2xl max-rl:leading-tight font-erstoria text-brand pt-16 md:w-1/2">
                        Ne laissez pas le temps abîmer vos montres
                    </p>
                    <div className="flex gap-8 mt-8 font-just-sans">
                        {auth && auth.user ? (
                            <Link href="/dashboard" className="hover-underline rl:text-2xl md:text-xl sm:text-lg text-base font-light">
                                <span>Accèdez à votre espace</span>
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hover-underline rl:text-2xl md:text-xl sm:text-lg text-base font-light">
                                    <span>Se connecter</span>
                                </Link>
                                <Link href="/register" className="hover-underline rl:text-2xl md:text-xl sm:text-lg text-base font-light">
                                    <span>Créer un compte</span>
                                </Link>
                            </>
                        )}
                    </div>
                </header>
                <ScrollImage className=" align-bottom" />
            </div>
            <ULTextSection />
        </>
    );
}

