import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ collections, revisions }) {
    const { data, setData, post, processing, errors } = useForm({
        collection_id: '',
        revision_ids: [],
        description: '',
        date: null,
        price: null,
        status: 'asked',
    });

    const handleRevisionChange = (id) => {
        const newRevisionIds = data.revision_ids.includes(id)
            ? data.revision_ids.filter(revId => revId !== id)
            : [...data.revision_ids, id];
        setData('revision_ids', newRevisionIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('repair.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Demander une réparation" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl mb-8 text-brand">Demander une réparation</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="collection_id" value="Choisir une montre" />
                                <select
                                    id="collection_id"
                                    name="collection_id"
                                    value={data.collection_id}
                                    onChange={e => setData('collection_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="">Sélectionnez une montre</option>
                                    {collections.map(collection => (
                                        <option key={collection.id} value={collection.id}>
                                            {collection.watch.creator.name} - {collection.watch.model}
                                        </option>
                                    ))}
                                </select>
                                {errors.collection_id && <InputError message={errors.collection_id} />}
                            </div>
                            <div>
                                <InputLabel value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.description && <InputError message={errors.description} />}
                            </div>

                            <div>
                                <InputLabel value="Types de réparation" />
                                <div className="mt-4 space-y-4">
                                    {revisions.map(revision => (
                                        <div key={revision.id} className="flex items-center">
                                            <input
                                                id={`revision-${revision.id}`}
                                                name="revision_ids"
                                                type="checkbox"
                                                value={revision.id}
                                                checked={data.revision_ids.includes(revision.id)}
                                                onChange={() => handleRevisionChange(revision.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                                            />
                                            <label htmlFor={`revision-${revision.id}`} className="ml-3 block text-sm text-white">
                                                {revision.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.revision_ids && <InputError message={errors.revision_ids} />}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-brand text-black rounded-md hover:bg-brand/80 transition-colors duration-200"
                                >
                                    Demander la réparation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
