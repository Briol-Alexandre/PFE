import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Edit({ repair, collections, revisions }) {
    const { data, setData, patch, processing, errors } = useForm({
        collection_id: repair.collection_id,
        revisions: repair.revisions || [],
        description: repair.description,
        refuse_reason: null,
        modify_reason: null,
        date: null,
        price: null,
    });

    const handleRevisionChange = (id) => {
        const revision = revisions.find(r => r.id === parseInt(id));
        const newRevisions = data.revisions.some(r => r.id === parseInt(id))
            ? data.revisions.filter(r => r.id !== parseInt(id))
            : [...data.revisions, { id: revision.id, name: revision.name }];
        setData('revisions', newRevisions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Soumission du formulaire...');
        console.log('Data:', data);
        patch(route('repair.update', repair.id), data, {
            onSuccess: () => console.log('Succès !'),
            onError: (errors) => console.log('Erreurs:', errors)
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Modifier la réparation" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl mb-8 text-brand">Modifier la réparation</h1>
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
                                                name="revisions"
                                                type="checkbox"
                                                value={revision.id}
                                                checked={data.revisions.some(r => r.id === revision.id)}

                                                onChange={() => handleRevisionChange(revision.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                                            />
                                            <label htmlFor={`revision-${revision.id}`} className="ml-3 block text-sm text-white">
                                                {revision.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.revisions && <InputError message={errors.revisions} />}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-brand text-black rounded-md hover:bg-brand/80 transition-colors duration-200"
                                >
                                    Enregistrer les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
