import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Single({ watch }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('watch.destroy', { watch: watch.id }));
    };
    return (
        <AuthenticatedLayout>
            <Head title={watch.model} />
            <div className="flex ">
                <img src={watch.image} alt={watch.model} className="fixed -z-10 -top-40 left-1/2 -translate-x-1/2 blur-2xl opacity-50 scale-125 max-w-[500px]" />
                <div className="text-white ml-20 mt-20 font-just-sans">
                    <p className="text-4xl font-erstoria text-brand">{watch.creator.name}</p>
                    <h1 className="text-5xl mb-4 font-erstoria">{watch.model}</h1>
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl">Informations</p>
                        <span>
                            <p>Type de mouvement</p>
                            <p className="capitalize text-brand">{watch.movement}</p>
                        </span>
                        <Link href={route('watch.edit', { watch: watch.id })} className="">
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
                                Supprimer la montre
                            </button>
                        </form>
                    </div>
                </div>
                <img src={watch.image} alt={watch.model} className="absolute bottom-0 right-0 max-h-[600px] object-cover" />
            </div>
            <Modal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className="bg-black/75 h-[300px] border border-white/10 flex flex-col justify-around text-white px-10"
            >
                <div>
                    <p className="text-2xl">Supprimer la montre</p>
                    <p>Êtes-vous sûr de vouloir supprimer cette montre ?</p>
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
                        className="px-4 py-2 rounded-md text-white transition-colors duration-300 bg-brand-red border hover:bg-transparent  border-brand-red"
                        onClick={handleDelete}
                    >
                        Supprimer
                    </button>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}