import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        model: '',
        movement: '',
        image: null,
        user_id: usePage().props.auth.user.id,
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
            <div>
                <h1 className="text-5xl text-center my-10 font-semibold mb-4 font-erstoria">Créer une montre</h1>
                <div className="max-w-2xl mx-auto px-6">
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Modèle</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={data.model}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.model && <div className="text-red-500 text-sm mt-1">{errors.model}</div>}
                            </div>
                            <div>
                                <InputLabel htmlFor="movement" value="Mouvement" />
                                <select
                                    name="movement"
                                    value={data.movement}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Sélectionnez un mouvement</option>
                                    <option value="quartz">Quartz</option>
                                    <option value="automatique">Automatique</option>
                                </select>
                                {errors.movement && <InputError message={errors.movement} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="image" value="Image" />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    className="mt-1 block w-full"
                                />
                                {errors.image && <InputError message={errors.image} />}
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover-underline ml-auto"
                                >
                                    {processing ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}