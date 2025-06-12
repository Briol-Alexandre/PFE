import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        model: '',
        available_movements: '',
        selected_movement: '',
        image: null,
        user_id: usePage().props.auth.user.id,
        available_straps: '',
        available_sizes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('watch.store'));
    };

    const handleChange = (e) => {
        const { name, type } = e.target;
        const value = type === 'file' ? e.target.files[0] : e.target.value;
        setData(name, value);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Créer une montre" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-4xl font-erstoria text-brand">Créer une montre</h2>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="model" value="Modèle" />
                                    <TextInput
                                        type="text"
                                        name="model"
                                        value={data.model}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-transparent"
                                    />
                                    {errors.model && <InputError message={errors.model} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="available_movements" value="Mouvements disponibles" />
                                    <TextInput
                                        type="text"
                                        name="available_movements"
                                        value={data.available_movements}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-transparent"
                                        placeholder="Entrez les mouvements disponibles séparés par des virgules (ex: Quartz, Automatique, Manuel)"
                                    />
                                    {errors.available_movements && <InputError message={errors.available_movements} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Image" />
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md
                                        file:text-sm file:font-semibold
                                        file:bg-transparent file:text-brand
                                        file:border file:border-brand
                                        hover:file:bg-brand hover:file:text-black
                                        file:transition-colors file:duration-200"
                                    />
                                    {errors.image && <InputError message={errors.image} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="available_straps" value="Bracelets disponibles" />
                                    <TextInput
                                        type="text"
                                        name="available_straps"
                                        value={data.available_straps}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-transparent"
                                        placeholder="Entrez les bracelets disponibles séparés par des virgules (ex: Cuir noir, Acier, Caoutchouc)"
                                    />
                                    {errors.available_straps && <InputError message={errors.available_straps} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="available_sizes" value="Tailles de cadran disponibles" />
                                    <TextInput
                                        type="text"
                                        name="available_sizes"
                                        value={data.available_sizes}
                                        onChange={handleChange}
                                        className="mt-1 block w-full bg-transparent"
                                        placeholder="Entrez les tailles disponibles séparées par des virgules (ex: 36mm, 39mm, 41mm)"
                                    />
                                    {errors.available_sizes && <InputError message={errors.available_sizes} />}
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                    >
                                        {processing ? 'Création...' : 'Créer'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}