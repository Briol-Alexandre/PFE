import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ collections, revisions, watch_id }) {
    const { data, setData, post, processing, errors } = useForm({
        collection_id: watch_id || '',
        revision_ids: [],
        description: '',
        date: null,
        refuse_reason: null,
        modify_reason: null,
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
        post(route('repair.store'), {
            onError: (errors) => {
                console.error('Erreur lors de la création:', errors);
            },
            onSuccess: () => {
                console.log('Réparation créée avec succès');
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Demander une réparation" />
            <section className="py-12" aria-labelledby="repair-title">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-start mb-8 border-b border-brand-green pb-4">
                            <h2 className="text-4xl font-erstoria text-brand" id="repair-title">Demander une réparation</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="collection_id" value="Choisir une montre" />
                                <select
                                    id="collection_id"
                                    name="collection_id"
                                    value={data.collection_id}
                                    onChange={e => setData('collection_id', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-white shadow-sm focus:border-brand-green focus:ring-brand-green"
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
                                <InputLabel value="Réparation(s) nécessaire(s)" />
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
                                                className="h-4 w-4 rounded border-gray-500 text-gray-500 focus:ring-brand-red focus:ring-2"
                                            />
                                            <label htmlFor={`revision-${revision.id}`} className="ml-3 block text-sm text-white">
                                                {revision.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.revision_ids && <InputError message={errors.revision_ids} />}
                            </div>
                            <div>
                                <InputLabel value="Description" />
                                <textarea
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-white shadow-sm focus:border-brand-green focus:ring-brand-green"
                                />
                                {errors.description && <InputError message={errors.description} />}
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover-underline ml-auto"
                                >
                                    {processing ? 'Envoi en cours...' : 'Demander la/les réparation(s)'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
