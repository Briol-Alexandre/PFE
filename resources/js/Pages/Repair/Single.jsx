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
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [acceptError, setAcceptError] = useState('');

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('repair.destroy', repair.id));
    };

    const handleAccept = (e) => {
        e.preventDefault();

        // Si le statut est 'modified', on accepte directement sans choisir de date
        if (repair.status === 'modified') {
            router.post(route('repair.accept', repair.id), {
                _method: 'POST',
                date: repair.date // On garde la date existante
            }, {
                onSuccess: () => {
                    console.log('Succès!');
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error('Erreur:', errors);
                    alert('Une erreur est survenue');
                }
            });
            return;
        }

        // Pour les autres statuts, on vérifie la sélection d'une date
        if (!selectedDate) {
            setAcceptError('Veuillez sélectionner une date');
            return;
        }

        const formData = {
            date: selectedDate,
            _method: 'POST'
        };

        console.log('Envoi de la date:', formData);

        router.post(route('repair.accept', repair.id), formData, {
            onSuccess: () => {
                console.log('Succès!');
                setIsAcceptModalOpen(false);
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Erreur:', errors);
                setAcceptError(errors.date || 'Une erreur est survenue');
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Réparation : ${repair.collection.watch.model}`} />

            <div className="py-12">
                <section className="max-w-7xl mx-auto sm:px-6 lg:px-8" aria-labelledby='repair-info'>
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between md:items-start items-center mb-8 border-b border-brand-green pb-4">
                            <div className="flex max-md:flex-col-reverse gap-4 max-md:items-start items-center">
                                <div>
                                    <p className="text-xl text-gray-400">Col&MacArthur</p>
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
                                {(repair.status === 'pending' || repair.status === 'modified') && (
                                    <>
                                        <button
                                            onClick={(e) => repair.status === 'modified' ? handleAccept(e) : setIsAcceptModalOpen(true)}
                                            className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                        >
                                            Accepter {repair.status === 'modified' ? 'la modification' : 'le devis'}
                                        </button>
                                        {repair.status === 'pending' && (
                                            <Link
                                                href={route('repair.refuse_user', repair.id)}
                                                className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-black transition-colors duration-200"
                                            >
                                                Refuser le devis
                                            </Link>
                                        )}
                                    </>
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

                        <div className="text-white font-just-sans border-b border-brand-green pb-8">
                            <p className="text-2xl font-bold">Informations sur la réparation</p>
                            <div className="grid grid-cols-2 gap-4 mt-6 ">
                                <div className='flex flex-col gap-4 '>
                                    <span>
                                        <p className="font-semibold">Révision(s) demandée(s)</p>
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
                                        <p className="font-semibold">Description</p>
                                        <p className="text-brand/80">{repair.description}</p>
                                    </span>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <span>
                                        <p className="font-semibold">{repair.status === 'pending' ? 'Dates proposées' : 'Date de la réparation'}</p>
                                        {repair.status === 'pending' ? (
                                            <div className="space-y-1">
                                                {repair.proposed_dates?.map((date, index) => (
                                                    <p key={index} className="text-brand/80">
                                                        {formatRepairDate(date)}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-brand/80">
                                                {formatRepairDate(repair.date)}
                                            </p>
                                        )}
                                    </span>
                                    <span>
                                        <p className="font-semibold">Prix total</p>
                                        <p className="text-brand/80">
                                            {repair.price
                                                ? `${repair.price}€`
                                                : 'Non renseigné'
                                            }
                                        </p>
                                    </span>
                                </div>
                            </div>
                            {repair.status === 'accepted' && (
                                <p className='mt-6 font-bold text-brand text-lg'>Vous devez ammener votre montre à la réparation {formatRepairDate(repair.date)}.</p>
                            )}

                        </div>
                        {repair.status === 'rejected' && repair.refuse_reason && (
                            <div className="mt-8">
                                <span>
                                    <p className='text-2xl font-bold text-brand'>Motif du refus</p>
                                    <p className="text-brand">{repair.refuse_reason}</p>
                                </span>
                            </div>
                        )}
                        {repair.status === 'modified' && repair.modify_reason && (
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

            <Modal
                show={isAcceptModalOpen}
                onClose={() => setIsAcceptModalOpen(false)}
                className='bg-black/75 border border-white/10 flex flex-col justify-around text-white px-10 py-6'
            >
                <div className="p-6">
                    <h2 className="text-lg font-medium text-brand mb-4">
                        Choisissez une date pour la réparation
                    </h2>
                    <div className="space-y-4">
                        {repair.proposed_dates?.map((date, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <input
                                    type="radio"
                                    id={`date-${index}`}
                                    name="repair-date"
                                    value={date}
                                    checked={selectedDate === date}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setAcceptError('');
                                    }}
                                    className="text-brand focus:ring-brand"
                                />
                                <label htmlFor={`date-${index}`} className="text-white">
                                    {formatRepairDate(date)}
                                </label>
                            </div>
                        ))}
                        {acceptError && (
                            <p className="text-red-500 text-sm mt-2">{acceptError}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            className="px-4 py-2 bg-transparent border border-white/20 rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-white/10 transition-colors duration-200"
                            onClick={() => setIsAcceptModalOpen(false)}
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-brand border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-brand/80 transition-colors duration-200"
                            onClick={handleAccept}
                        >
                            Confirmer
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
