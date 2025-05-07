import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        model: '',
        purchase_date: '',
        movement: '',
        image: null,
        user_id: usePage().props.auth.user.id,
        waranty_end_date: '',
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-semibold mb-6">Créer une montre</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Modèle</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={data.model}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.model && <div className="text-red-500 text-sm mt-1">{errors.model}</div>}
                            </div>

                            <div>
                                <InputLabel htmlFor="purchase_date" value="Date d'achat" />
                                <TextInput
                                    id="purchase_date"
                                    type="date"
                                    name="purchase_date"
                                    value={data.purchase_date}
                                    onChange={handleChange}
                                />
                                {errors.purchase_date && <InputError message={errors.purchase_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="waranty_end_date" value="Date de fin de garantie" />
                                <TextInput
                                    id="waranty_end_date"
                                    type="date"
                                    name="waranty_end_date"
                                    value={data.waranty_end_date}
                                    onChange={handleChange}
                                />
                                {errors.waranty_end_date && <InputError message={errors.waranty_end_date} />}
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
                                    <option value="mecanique">Mécanique</option>
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
                                    className="bg-brand hover:bg-brand-red text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out"
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