import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Single({ watch }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('watch.destroy', { watch: watch.id }));
    };
    return (
        <AuthenticatedLayout>
            <Head title={watch.model} />
            <div className="relative mt-20">
                {/* Image floue en arrière-plan */}
                <img
                    src={watch.image}
                    alt=""
                    className="fixed -z-10 -top-40 left-1/2 -translate-x-1/2 blur-2xl opacity-50 scale-125 max-w-[500px]"
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 rg:px-8">
                    <div className="flex flex-col rg:flex-row rg:items-center rg:justify-between rg:space-x-8">
                        {/* Informations */}
                        <div className="w-full rg:w-1/2 text-white font-just-sans">
                            <p className="text-3xl rg:text-4xl font-erstoria text-brand">Col&MacArthur</p>
                            <h1 className="text-4xl rg:text-5xl mb-4 font-erstoria">{watch.model}</h1>

                            {/* Image principale - visible uniquement sur mobile */}
                            <div className="block rg:hidden mb-8">
                                <img
                                    src={watch.image}
                                    alt={watch.model}
                                    className="w-full max-w-[300px] mx-auto object-contain rounded-lg"
                                />
                            </div>

                            <div className="flex flex-col gap-4 mt-8">
                                <p className="text-xl rg:text-2xl">Informations</p>
                                <div className="space-y-4">
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Type de mouvement</p>
                                        <p className="capitalize text-brand">{watch.available_movements.join(', ')}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Bracelet</p>
                                        <p className="capitalize text-brand">{watch.available_straps.join(', ')}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Taille du cadran</p>
                                        <p className="capitalize text-brand">{watch.available_sizes.join(', ')}</p>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Link
                                        href={route('watch.edit', { watch: watch.id })}
                                        className="inline-block px-6 py-3 rounded-md transition-colors duration-300 border border-brand hover:bg-brand hover:text-black text-white"
                                    >
                                        Modifier les informations
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Image principale - visible uniquement sur desktop */}
                        <div className="hidden rg:block rg:w-1/2">
                            <div className="sticky top-8">
                                <img
                                    src={watch.image}
                                    alt={watch.model}
                                    className="w-full max-w-[500px] ml-auto object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}