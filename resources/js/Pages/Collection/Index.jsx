import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import CollectionCard from '@/Components/Collection/Card';

export default function Index() {
    const collections = usePage().props.collections;
    return (
        <AuthenticatedLayout>
            <Head title="Votre collection" />
            <div className='text-white'>
                <h1 className="font-semibold font-erstoria text-3xl text-brand leading-tight">Votre collection</h1>
                <CollectionCard collections={collections} />
                <Link href={route('collection.create')} className="hover-underline mx-auto mt-10">Ajouter une montre</Link>
            </div>
        </AuthenticatedLayout>
    );
}