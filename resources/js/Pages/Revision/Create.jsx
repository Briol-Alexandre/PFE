import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('revision.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter une réparation" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h2 className="text-4xl font-erstoria text-brand">Ajouter un type de réparation</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nom de la réparation" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        type="text"
                                        className="mt-1 block w-full bg-transparent"
                                    />
                                    {errors.name && <InputError message={errors.name} />}
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                    >
                                        {processing ? 'Création en cours...' : 'Créer la réparation'}
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
