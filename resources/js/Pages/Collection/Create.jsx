import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Create({ watches }) {
    const { data, setData, post, processing, errors } = useForm({
        watch_id: '',
        purchase_date: '',
        warranty_end_date: '',
        warranty_image: null,
        user_id: usePage().props.auth.user.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('collection.store'));
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter une montre" />
            <div>
                <h1 className="lg:text-5xl rl:text-4xl text-3xl text-center rl:my-10  font-semibold font-erstoria">Ajouter une montre à ma collection</h1>
                <div className="max-w-2xl mx-auto px-6">
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6 py-10">
                            <div>
                                <InputLabel htmlFor="watch_id" value="Sélectionner une montre" />
                                <select
                                    name="watch_id"
                                    id="watch_id"
                                    value={data.watch_id}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Choisir une montre...</option>
                                    {watches.map((watch) => (
                                        <option key={watch.id} value={watch.id}>
                                            {watch.creator.name} - {watch.model}
                                        </option>
                                    ))}
                                </select>
                                {errors.watch_id && <InputError message={errors.watch_id} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="purchase_date" value="Date d'achat" />
                                <input
                                    type="date"
                                    name="purchase_date"
                                    id="purchase_date"
                                    value={data.purchase_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.purchase_date && <InputError message={errors.purchase_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="warranty_end_date" value="Date de fin de garantie" />
                                <input
                                    type="date"
                                    name="warranty_end_date"
                                    id="warranty_end_date"
                                    value={data.warranty_end_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.warranty_end_date && <InputError message={errors.warranty_end_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="warranty_image" value="Image de la garantie" />
                                <input
                                    type="file"
                                    name="warranty_image"
                                    id="warranty_image"
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    accept="image/*"
                                />
                                {errors.warranty_image && <InputError message={errors.warranty_image} />}
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover-underline ml-auto"
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter à ma collection'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}