import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';

const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
};

export default function ModifyPriceAndDate({ repair }) {
    const { data, setData, patch, processing, errors } = useForm({
        price: repair.price || '',
        status: 'modified',
        modify_reason: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('repair.update_price_and_date', repair.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Modifier le prix et la date" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-xl text-gray-400">Col&MacArthur</p>
                                    <h2 className="text-4xl font-erstoria text-brand">{repair.collection.watch.model}</h2>
                                </div>
                            </div>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="price" value="Prix" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full bg-transparent"
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="modify_reason" value="Raison de la modification" />
                                    <TextArea
                                        id="modify_reason"
                                        name="modify_reason"
                                        value={data.modify_reason}
                                        className="mt-1 block w-full bg-transparent"
                                        onChange={(e) => setData('modify_reason', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.modify_reason} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-brand text-black rounded-md hover:bg-brand/80 transition-colors duration-200"
                                        disabled={processing}
                                    >
                                        Modifier
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
