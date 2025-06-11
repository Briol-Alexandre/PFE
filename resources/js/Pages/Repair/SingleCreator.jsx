import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { formatRepairDate } from "@/Utils/dateFormat";
import { isSameDay } from 'date-fns';
import ProgressBar from "@/Components/Repairs/ProgressBar";
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';


export default function SingleCreator({ repair }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [data, setData] = useState({
        refuse_reason: '',
        status: 'rejected',
        price: repair.price,
        date: repair.date,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleRefuse = (e) => {
        e.preventDefault();
        const submitData = {
            ...data,
            status: 'rejected'
        };
        router.patch(route('repair.refuse_creator', repair.id), submitData, {
            onError: (errors) => {
                setErrors(errors);
            },
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            },
        });
    };
    const [showWarrantyImage, setShowWarrantyImage] = useState(false);


    return (
        <AuthenticatedLayout>
            <Head title={`Réparation : ${repair.collection.watch.model}`} />

            <div className="py-12">
                <section className="max-w-7xl mx-auto sm:px-6 lg:px-8" aria-labelledby='repair-info'>
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-start mb-8 border-b border-white/50 pb-4">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-xl text-gray-400">Col&MacArthur</p>
                                    <h2 className="text-4xl font-erstoria text-brand" id='repair-info'>{repair.collection.watch.model}</h2>
                                </div>
                                <div className="space-y-2">
                                    <ProgressBar status={repair.status} />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                {repair.status === 'asked' && (
                                    <>
                                        <Link
                                            href={route('repair.edit_estimate', repair.id)}
                                            className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                        >
                                            Accepter
                                        </Link>
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-200"
                                        >
                                            Refuser
                                        </button>
                                    </>
                                )}
                                {repair.status === 'in_progress' && (
                                    <Link
                                        href={route('repair.completed', repair.id)}
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                    >
                                        Indiquer comme terminée
                                    </Link>
                                )}
                                {repair.status === 'accepted' && (
                                    <Link
                                        href={route('repair.modify_price_and_date', repair.id)}
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                    >
                                        Modifier le prix et/ou la date
                                    </Link>
                                )}
                                {repair.status === 'accepted' && isSameDay(new Date(repair.date), new Date()) && (
                                    <Link
                                        href={route('repair.start', repair.id)}
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                    >
                                        Démarrer la réparation
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="text-white font-just-sans">
                            <p className="text-2xl font-bold">Informations sur la réparation</p>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className='flex flex-col gap-4'>
                                    <span>
                                        <p className="font-semibold">Client</p>
                                        <p className="text-brand/80">{repair.collection.user.first_name} {repair.collection.user.name} ({repair.collection.user.email})</p>
                                    </span>
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
                                    <span>
                                        <p className="font-semibold">Date de fin de garantie de la montre</p>
                                        <div className='flex items-center gap-2'>
                                            <p className="text-brand/80">
                                                {repair.collection.warranty_end_date
                                                    ? new Date(repair.collection.warranty_end_date).toLocaleDateString()
                                                    : 'Non renseigné'
                                                }
                                            </p>
                                            {repair.collection.warranty_image && (
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
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <span>
                                        <p className="font-semibold">
                                            {repair.status === 'pending' ? 'Dates proposées' : 'Date de la réparation'}
                                        </p>
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
                        </div>
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
                        Êtes-vous sûr de vouloir refuser cette réparation ?
                    </h2>
                    <form onSubmit={handleRefuse} className="mt-4 space-y-4">
                        <div>
                            <InputLabel htmlFor="refuse_reason" value="Motif de refus" className="text-white" />
                            <TextInput
                                id="refuse_reason"
                                type="text"
                                name="refuse_reason"
                                value={data.refuse_reason}
                                onChange={handleChange}
                                className="w-full mt-1 bg-black/50 border-white/20 text-white"
                                placeholder="Veuillez indiquer la raison du refus"
                                required
                            />
                            {errors.refuse_reason && <InputError message={errors.refuse_reason} />}
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 bg-transparent border border-white/20 rounded-md font-semisemibold text-xs text-white uppercase tracking-widest hover:bg-white/10 transition-colors duration-200"
                                onClick={() => setIsDeleteModalOpen(false)}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-red-600 border border-transparent rounded-md font-semisemibold text-xs text-white uppercase tracking-widest hover:bg-red-500 transition-colors duration-200"
                            >
                                Confirmer le refus
                            </button>
                        </div>
                    </form>


                </div>
            </Modal>
            <Modal
                show={showWarrantyImage}
                onClose={() => setShowWarrantyImage(false)}
                className='bg-black/75 h-[300px] border border-white/10 flex flex-col justify-around text-white px-10'
            >
                <img
                    src={`/storage/${repair.collection.warranty_image}`}
                    alt="Image de garantie"
                    className="w-full h-full object-contain"
                />
            </Modal>
        </AuthenticatedLayout>
    );
}
