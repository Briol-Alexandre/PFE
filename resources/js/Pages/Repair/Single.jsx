import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Single({ repair }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('repair.destroy', repair.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Réparation - ${repair.collection.watch.model}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-4xl font-erstoria text-brand">{repair.collection.watch.model}</h1>
                                <p className="text-xl text-gray-400">{repair.collection.watch.creator.name}</p>
                            </div>
                            <div className="flex gap-4">
                                <Link
                                    href={route('repair.edit', repair.id)}
                                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                >
                                    Modifier
                                </Link>
                                <button
                                    onClick={() => setIsDeleteModalOpen(true)}
                                    className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-2xl text-brand mb-4">Informations</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-400">Date</p>
                                        <p className="text-xl">
                                            {repair.date
                                                ? new Date(repair.date).toLocaleDateString()
                                                : 'Non planifiée'
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Prix total</p>
                                        <p className="text-xl">
                                            {repair.price
                                                ? `${repair.price}€`
                                                : 'Non renseigné'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl text-brand mb-4">Révisions demandées</h2>
                                <div className="space-y-2">
                                    {repair.revisions.map(revision => (
                                        <div key={revision.id} className="flex justify-between items-center">
                                            <span>{revision.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                className='bg-black/75 h-[300px] border border-white/10 flex flex-col justify-around text-white px-10'
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-brand">
                        Êtes-vous sûr de vouloir supprimer cette réparation ?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <button
                            type="button"
                            className="mr-3 px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Annuler
                        </button>

                        <button
                            type="button"
                            className="px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500"
                            onClick={handleDelete}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
