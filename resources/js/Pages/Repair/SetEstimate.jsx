import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function SetEstimate({ repair }) {
    const { data, setData, patch, processing, errors } = useForm({
        date: repair.date || '',
        price: repair.price || '',
        status: 'pending'
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('repair.update_estimate', repair.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Accepter la réparation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-xl text-gray-400">{repair.collection.watch.creator.name}</p>
                                    <h2 className="text-4xl font-erstoria text-brand">{repair.collection.watch.model}</h2>
                                </div>
                            </div>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="date" value="Date et heure de la réparation" />
                                    <TextInput
                                        id="date"
                                        type="datetime-local"
                                        name="date"
                                        value={data.date}
                                        className="mt-1 block w-full bg-transparent"
                                        onChange={e => setData('date', e.target.value)}
                                    />
                                    {errors.date && <InputError message={errors.date} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Prix estimé" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full bg-transparent"
                                        onChange={e => setData('price', e.target.value)}
                                    />
                                    {errors.price && <InputError message={errors.price} />}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                        disabled={processing}
                                    >
                                        Valider l'estimation
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
