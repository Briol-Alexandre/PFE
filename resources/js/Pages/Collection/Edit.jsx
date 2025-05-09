import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Link } from '@inertiajs/react';

export default function Edit({ collection }) {
    const { data, setData, patch, processing, errors } = useForm({
        purchase_date: collection.purchase_date,
        warranty_end_date: collection.warranty_end_date,
        watch_id: collection.watch.id,
        user_id: collection.user_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('collection.update', { collection: collection.id }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Modifier ${collection.watch.model}`} />
            <div>
                <h1 className="text-4xl px-20 my-10 font-semibold mb-4 font-erstoria">
                    Modifier {collection.watch.model}
                </h1>
                <form onSubmit={handleSubmit} className="form flex justify-around gap-8 p-6 items-center">
                    <div className="w-1/3 relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                            {collection.watch.image && (
                                <img
                                    src={collection.watch.image}
                                    alt={`Image de ${collection.watch.model}`}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                    </div>

                    <div className="w-1/2 space-y-6">
                        <div>
                            <InputLabel htmlFor="purchase_date" value="Date d'achat" className="text-white" />
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
                            <InputLabel htmlFor="warranty_end_date" value="Date de fin de garantie" className="text-white" />
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

                        <div className="pt-4 flex justify-between w-full items-center">
                            <Link href={route('collection.show', { collection: collection.id })} className='text-xl underline'>
                                Retour
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="hover-underline text-xl"
                            >
                                {processing ? 'Modification en cours...' : 'Modifier'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}   