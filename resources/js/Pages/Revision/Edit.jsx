import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Edit({ revision }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: revision.name,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('revision.update', revision.id));
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette réparation ?')) {
            router.delete(route('revision.destroy', revision.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Modifier un type de réparation" />
            <div>
                <h1 className="lg:text-5xl rl:text-4xl text-3xl text-center rl:my-10 font-semibold font-erstoria pb-10">Modifier un type de réparation</h1>
                <div className="max-w-2xl mx-auto px-6">
                    <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                        <div>
                            <InputLabel htmlFor="name" value="Nom de la réparation" />
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                type="text"
                                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>

                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-700"
                            >
                                Supprimer
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="hover-underline"
                            >
                                {processing ? 'Modification en cours...' : 'Modifier la réparation'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
