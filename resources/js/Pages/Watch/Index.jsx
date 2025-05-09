import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import WatchCard from '@/Components/Watch/Card';

export default function Index({ watches }) {
    return (
        <AuthenticatedLayout>
            <Head title="Vos montres" />
            <div className='text-white'>
                <h2 className="font-semibold font-erstoria text-3xl text-brand leading-tight">Vos montres</h2>
                <WatchCard watches={watches} />
            </div>
            <div className="flex justify-center mt-8">
                <Link href={route('watch.create')}>
                    <button
                        type="button"
                        className="hover-underline"
                    >
                        Créer une montre
                    </button>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}