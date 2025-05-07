import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from "@inertiajs/react";
import { useEffect, useState, useRef } from 'react';
import { FastAverageColor } from 'fast-average-color';
import Modal from '@/Components/Modal';

export default function Single({ watch }) {
    const [dominantColor, setDominantColor] = useState('#7E7E7E');
    const [isHovered, setIsHovered] = useState(false);
    const imageRef = useRef(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    useEffect(() => {
        const fac = new FastAverageColor();
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = watch.image;

        image.onload = () => {
            const color = fac.getColor(image);
            setDominantColor(color.hex);
        };
    }, [watch.image]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDeleteModalOpen(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route('watch.destroy', { watch: watch.id }));
    };
    const formattedDate = new Date(watch.purchase_date).toLocaleDateString('fr-FR');
    const formattedWarantyEndDate = watch.waranty_end_date ? new Date(watch.waranty_end_date).toLocaleDateString('fr-FR') : '---';
    return (
        <AuthenticatedLayout>
            <Head title={watch.model} />
            <div className="flex ">
                <img src={watch.image} alt={watch.model} className="fixed -z-10 -top-40 left-1/2 -translate-x-1/2 blur-2xl opacity-50 scale-125 max-w-[500px]" />
                <div className="text-white ml-20 mt-20 font-just-sans">
                    <p className="text-4xl font-erstoria" style={{ color: dominantColor }}>Nom de la marque</p>
                    <h1 className="text-5xl mb-4 font-erstoria">{watch.model}</h1>
                    <div className="flex flex-col gap-4">
                        <p className="text-2xl">Informations</p>
                        <span>
                            <p>Type de mouvement</p>
                            <p style={{ color: dominantColor }} className="capitalize">{watch.movement}</p>
                        </span>
                        <span>
                            <p>Date d'achat</p>
                            <p style={{ color: dominantColor }}>{formattedDate}</p>
                        </span>
                        <span>
                            <p>Garantie</p>
                            <p style={{ color: dominantColor }}>{watch.waranty_end_date ? formattedWarantyEndDate : '---'}</p>
                        </span>
                        <Link href={route('watch.edit', { watch: watch.id })} className="">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md transition-colors duration-300"
                                style={{
                                    border: '1px solid ' + dominantColor,
                                    backgroundColor: isHovered ? dominantColor : 'transparent',
                                    color: isHovered ? 'black' : 'white'
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
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
                <img src={watch.image} alt={watch.model} className="absolute bottom-0 right-0 max-h-[600px]" />
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