import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react";
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import RepairCard from '@/Components/Repairs/Card';

export default function Single({ collection, upcoming_repairs, past_repairs }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showWarrantyImage, setShowWarrantyImage] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('collection.destroy', { collection: collection.id }));
    };

    return (
        <AuthenticatedLayout>
            <Head title={collection.watch.model} />
            <section className="relative" aria-labelledby="collection-title">
                {/* Image floue en arrière-plan */}
                <img
                    src={collection.watch.image}
                    alt=""
                    className="fixed -z-10 -top-40 left-1/2 -translate-x-1/2 blur-2xl opacity-50 scale-125 max-w-[500px]"
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col rg:flex-row rg:items-center rg:justify-between rg:space-x-8">
                        {/* Informations */}
                        <div className="w-full rg:w-1/2 text-white font-just-sans">
                            <p className="text-3xl rg:text-4xl font-erstoria text-brand/70">Col&MacArthur</p>
                            <h2 className="text-4xl rg:text-5xl mb-4 font-erstoria" id="collection-title">{collection.watch.model}</h2>

                            {/* Image principale - visible uniquement sur mobile */}
                            <div className="block rg:hidden mb-8">
                                <img
                                    src={collection.watch.image}
                                    alt={collection.watch.model}
                                    className="w-full max-w-[300px] mx-auto object-contain rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col gap-4 mt-8">
                                <p className="text-xl lg:text-2xl">Informations</p>
                                <div className="space-y-4">
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Type de mouvement</p>
                                        <p className="capitalize text-brand/80">{collection.selected_movement}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Bracelet</p>
                                        <p className="capitalize text-brand/80">{collection.selected_strap}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Taille du cadran</p>
                                        <p className="capitalize text-brand/80">{collection.selected_size}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Date d'achat</p>
                                        <p className="text-brand/80">{!collection.purchase_date ? 'Non renseigné' : new Date(collection.purchase_date).toLocaleDateString()}</p>
                                    </div>
                                    <div className="border-b border-brand/20 pb-2">
                                        <p className="text-gray-400">Fin de garantie</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-brand/80">{!collection.warranty_end_date ? 'Non renseigné' : new Date(collection.warranty_end_date).toLocaleDateString()}</p>
                                            {collection.warranty_image && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowWarrantyImage(true)}
                                                    className="w-4 h-4 rounded-full border border-brand flex items-center justify-center hover:bg-brand hover:text-black transition-colors duration-300 text-xs"
                                                >
                                                    ?
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <Link
                                        href={route('collection.edit', { collection: collection.id })}
                                        className="inline-block px-6 py-3 rounded-md transition-colors duration-300 border border-brand hover:bg-brand hover:text-black text-white text-center"
                                    >
                                        Modifier les informations
                                    </Link>
                                    <form onSubmit={handleSubmit} className="inline-block">
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 rounded-md text-white transition-colors duration-300 hover:bg-brand-red border border-brand-red text-center"
                                        >
                                            Supprimer de ma collection
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Image principale - visible uniquement sur desktop */}
                        <div className="hidden rg:block rg:w-1/2">
                            <div className="sticky top-8">
                                <img
                                    src={collection.watch.image}
                                    alt={collection.watch.model}
                                    className="w-full max-w-[500px] ml-auto object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section aria-labelledby="repairs-title" className="mt-16 rg:mt-40 max-w-7xl mx-auto px-4 sm:px-6 rg:px-8 text-center">
                <h2 className="text-2xl font-semibold text-brand text-left" id="repairs-title">Réparations</h2>
                <div className="space-y-8">
                    {upcoming_repairs.length > 0 && (
                        <div className="my-10">
                            <h3 className="text-xl text-brand mb-4 text-left">Réparations à venir</h3>
                            <RepairCard repairs={upcoming_repairs} />
                        </div>
                    )}
                    {past_repairs.length > 0 && (
                        <div className="my-10">
                            <h3 className="text-xl text-brand mb-4">Réparations passées</h3>
                            <RepairCard repairs={past_repairs} />
                        </div>
                    )}
                    {!upcoming_repairs.length && !past_repairs.length && (
                        <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
                    )}
                </div>
                <Link href={route('repair.create', { watch_id: collection.watch.id })} className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200 mx-auto mt-8">
                    Ajouter une réparation
                </Link>
            </section>

            <Modal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="bg-black/75 h-[300px] border border-white/10 flex flex-col justify-around text-white px-10"
            >
                <div>
                    <p className="text-2xl">Supprimer de ma collection</p>
                    <p>Êtes-vous sûr de vouloir supprimer cette montre de votre collection ?</p>
                    <small>Cette action est irréversible.</small>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="px-4 py-2 rounded-md text-white transition-colors duration-300 hover:bg-brand-red border border-brand-red"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md text-white transition-colors duration-300 bg-brand-red border hover:bg-transparent border-brand-red"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </Modal>

            <Modal
                show={showWarrantyImage}
                onClose={() => setShowWarrantyImage(false)}
                className="bg-black/75 max-w-2xl mx-auto border border-white/10 flex flex-col justify-around text-white p-6"
            >
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl">Image de la garantie</p>
                        <button
                            type="button"
                            onClick={() => setShowWarrantyImage(false)}
                            className="text-white/50 hover:text-white transition-colors duration-300"
                        >
                            ✕
                        </button>
                    </div>
                    <img
                        src={`/storage/${collection.warranty_image}`}
                        alt="Image de la garantie"
                        className="max-w-full h-auto rounded-lg"
                    />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}