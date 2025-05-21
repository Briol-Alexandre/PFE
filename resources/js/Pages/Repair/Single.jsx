import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { getRepairStatusInFrench, getRepairStatusColor } from "@/Utils/repairStatus";
import { formatRepairDate } from "@/Utils/dateFormat";
import ProgressBar from "@/Components/Repairs/ProgressBar";

export default function Single({ repair }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('repair.destroy', repair.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Réparation : ${repair.collection.watch.model}`} />

            <div className="py-12">
                <section className="max-w-7xl mx-auto sm:px-6 lg:px-8" aria-labelledby='repair-info'>
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-start mb-8 border-b border-white/50 pb-4">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-xl text-gray-400">{repair.collection.watch.creator.name}</p>
                                    <h2 className="text-4xl font-erstoria text-brand" id='repair-info'>{repair.collection.watch.model}</h2>

                                </div>
                                <div className="space-y-2">
                                    <ProgressBar status={repair.status} />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {repair.status === 'asked' && (<Link
                                    href={route('repair.edit', repair.id)}
                                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                >
                                    Modifier
                                </Link>)}
                                {repair.status === 'pending' && (<Link
                                    href={route('repair.accept', repair.id)}
                                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                >
                                    Accepter le devis
                                </Link>)}
                                {repair.status === 'asked' && (
                                    <button
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                                    >
                                        Supprimer
                                    </button>
                                )}
                                {repair.status === 'pending' && (
                                    <Link href={route('repair.refuse_user', repair.id)} className='px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200'>
                                        Refuser le devis
                                    </Link>
                                )}
                                {repair.status === 'accepted' && (
                                    <button onClick={() => setIsDeleteModalOpen(true)} className='px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200'>
                                        Annuler la réparation
                                    </button>
                                )}
                                {repair.status === 'rejected' && (
                                    <button onClick={() => setIsDeleteModalOpen(true)} className='px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200'>
                                        Supprimer la demande
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="text-white font-just-sans border-b border-white/50 pb-8">
                            <p className="text-2xl">Informations sur la réparation</p>
                            <div className="grid grid-cols-2 gap-4 mt-6 ">
                                <div className='flex flex-col gap-4 '>
                                    <span>
                                        <p>Révision(s) demandée(s)</p>
                                        {repair.revisions ? (
                                            <div className="text-brand/80">
                                                {repair.revisions.map(revision => (
                                                    <p key={revision.id}>{revision.name}</p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-brand/80">Aucune révision demandée</p>
                                        )}
                                    </span>
                                    <span>
                                        <p>Description</p>
                                        <p className="text-brand/80">{repair.description}</p>
                                    </span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <span>
                                        <p>Date de la réparation</p>
                                        <p className="text-brand/80">
                                            {formatRepairDate(repair.date)}
                                        </p>
                                    </span>
                                    <span>
                                        <p>Prix total</p>
                                        <p className="text-brand/80">
                                            {repair.price
                                                ? `${repair.price}€`
                                                : 'Non renseigné'
                                            }
                                        </p>
                                    </span>
                                </div>
                            </div>

                        </div>
                        {repair.status === 'rejected' && repair.refuse_reason && (
                            <div className="mt-8">
                                <span>
                                    <p className='text-2xl text-brand'>Motif du refus</p>
                                    <p className="text-brand">{repair.refuse_reason}</p>
                                </span>
                            </div>
                        )}
                        {repair.status === 'pending' && repair.modify_reason && (
                            <div className="mt-8">
                                <span>
                                    <p className='text-2xl text-brand'>Motif de la modification</p>
                                    <p className="text-brand">{repair.modify_reason}</p>
                                </span>
                            </div>
                        )}
                    </div>
                </section>
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
