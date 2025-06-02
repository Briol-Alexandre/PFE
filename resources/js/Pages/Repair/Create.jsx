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
            <div>
                <h1 className="lg:text-5xl rl:text-4xl text-3xl text-center rl:my-10 font-semibold font-erstoria pb-10">Demander une réparation</h1>
                <div className="max-w-2xl mx-auto px-6">

                    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
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
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
        </AuthenticatedLayout>
    );
}
