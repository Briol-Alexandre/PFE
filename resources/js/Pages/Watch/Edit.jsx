import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from 'react';

export default function Edit({ watch }) {
    const { data, setData, put, processing, errors, progress } = useForm({
        model: watch.model,
        available_movements: watch.available_movements ? watch.available_movements.join(', ') : '',
        selected_movement: watch.selected_movement || '',
        image: watch.image,
        user_id: usePage().props.auth.user.id,
        available_straps: watch.available_straps ? watch.available_straps.join(', ') : '',
        available_sizes: watch.available_sizes ? watch.available_sizes.join(', ') : '',
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('watch.update', { watch: watch.id }));
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
                            <InputLabel htmlFor="available_movements" value="Mouvements disponibles" />
                            <TextInput
                                id="available_movements"
                                type="text"
                                name="available_movements"
                                value={data.available_movements}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Entrez les mouvements disponibles séparés par des virgules (ex: Quartz, Automatique, Manuel)"
                            />
                            {errors.available_movements && <InputError message={errors.available_movements} />}
                        </div>

                        <div>
                            <InputLabel htmlFor="available_straps" value="Bracelets disponibles" />
                            <TextInput
                                id="available_straps"
                                type="text"
                                name="available_straps"
                                value={data.available_straps}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Entrez les bracelets disponibles séparés par des virgules (ex: Cuir noir, Acier, Caoutchouc)"
                            />
                            {errors.available_straps && <InputError message={errors.available_straps} />}
                        </div>

                        <div>
                            <InputLabel htmlFor="available_sizes" value="Tailles de cadran disponibles" />
                            <TextInput
                                id="available_sizes"
                                type="text"
                                name="available_sizes"
                                value={data.available_sizes}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Entrez les tailles disponibles séparées par des virgules (ex: 36mm, 39mm, 41mm)"
                            />
                            {errors.available_sizes && <InputError message={errors.available_sizes} />}
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