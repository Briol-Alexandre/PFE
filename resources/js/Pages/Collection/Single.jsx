import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';
import RepairCard from '@/Components/Repairs/Card';

export default function Single({ collection, upcoming_repairs, past_repairs }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showWarrantyImage, setShowWarrantyImage] = useState(false);

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
            <section className="flex relative" aria-labelledby="collection-title">
                <img
                    src={collection.watch.image}
                    alt={collection.watch.model}
                    className="fixed -z-10 -top-40 left-1/2 -translate-x-1/2 blur-2xl opacity-50 scale-125 max-w-[500px]"
                />
                <div className="text-white ml-20 mt-20 font-just-sans">
                    <p className="text-4xl font-erstoria text-brand/70">{collection.watch.creator.name}</p>
                    <h2 className="text-5xl mb-4 font-erstoria" id="collection-title">{collection.watch.model}</h2>
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl">Informations</p>
                        <span>
                            <p>Type de mouvement</p>
                            <p className="capitalize text-brand/80">{collection.watch.movement}</p>
                        </span>
                        <span>
                            <p>Date d'achat</p>
                            <p className="text-brand/80">{!collection.purchase_date ? 'Non renseigné' : new Date(collection.purchase_date).toLocaleDateString()}</p>
                        </span>
                        <span>
                            <p>Fin de garantie</p>
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
                        </span>
                        <Link href={route('collection.edit', { collection: collection.id })} className="">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md transition-colors duration-300 border border-brand hover:bg-brand hover:text-black text-white"
                            >
                                Modifier les informations
                            </button>
                        </Link>
                        <form onSubmit={handleSubmit}>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md text-white transition-colors duration-300 hover:bg-brand-red border border-brand-red"
                            >
                                Supprimer de ma collection
                            </button>
                        </form>
                    </div>
                </div>
                <img src={collection.watch.image} alt={collection.watch.model} className="absolute -bottom-36 right-0 max-h-[600px] object-cover" />
            </section>

            <section aria-labelledby="repairs-title" className="mt-40">
                <h2 className="text-2xl font-semibold text-brand" id="repairs-title">Réparations</h2>
                <div className="space-y-8">
                    {upcoming_repairs.length > 0 && (
                        <div>
                            <h3 className="text-xl text-brand mb-4">Réparations à venir</h3>
                            <RepairCard repairs={upcoming_repairs} />
                        </div>
                    )}
                    {past_repairs.length > 0 && (
                        <div>
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