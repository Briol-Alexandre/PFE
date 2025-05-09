import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function Edit({ watch }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        model: watch.model,
        movement: watch.movement,
        image: watch.image,
        _method: 'POST',
        user_id: usePage().props.auth.user.id,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('watch.update', { watch: watch.id }));
    };

    const handleChange = (e) => {
        const { name, type } = e.target;
        const value = type === 'file' ? e.target.files[0] : e.target.value;
        setData(name, value);

        // Créer une URL temporaire pour la prévisualisation de l'image
        if (type === 'file' && value) {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
        }
    };

    // Nettoyer l'URL temporaire quand le composant est démonté
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <AuthenticatedLayout>
            <Head title={`Modifier ${watch.model}`} />
            <div>
                <h1 className="text-5xl text-center my-10 font-semibold mb-4 font-erstoria">Modifier {watch.model}</h1>
                <form onSubmit={handleSubmit} className="form flex justify-around gap-8 p-6">
                    <div className="w-1/3 relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                            {watch.image ? (
                                <>
                                    <img
                                        src={previewUrl || watch.image}
                                        alt="Image actuelle de la montre"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <label htmlFor="image" className="cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                            Changer l'image
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <label htmlFor="image" className="cursor-pointer text-gray-500">
                                        Ajouter une image
                                    </label>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleChange}
                            className="hidden"
                            accept="image/*"
                        />
                        {errors.image && <InputError message={errors.image} />}
                        {progress && (
                            <div className="mt-2">
                                <progress value={progress.percentage} max="100" className="w-full">
                                    {progress.percentage}%
                                </progress>
                            </div>
                        )}
                    </div>

                    <div className="w-1/2 space-y-6">
                        <div>
                            <InputLabel htmlFor="model" value="Modèle" />
                            <TextInput
                                id="model"
                                type="text"
                                name="model"
                                value={data.model}
                                onChange={handleChange}
                                className="w-full"
                            />
                            {errors.model && <InputError message={errors.model} />}
                        </div>

                        <div>
                            <InputLabel htmlFor="movement" value="Mouvement" />
                            <select
                                name="movement"
                                value={data.movement}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Sélectionnez un mouvement</option>
                                <option value="quartz">Quartz</option>
                                <option value="mechanique">Mécanique</option>
                                <option value="automatique">Automatique</option>
                            </select>
                            {errors.movement && <InputError message={errors.movement} />}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="hover-underline ml-auto"
                            >
                                {processing ? 'En cours...' : 'Modifier la montre'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}