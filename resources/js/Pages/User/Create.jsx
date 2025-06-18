import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import { Head, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        name: '',
        email: '',
        password: '',
        role: 'user',
        skip_watch_addition: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Nouvel utilisateur" />

            <div>
                <h1 className="text-5xl text-center my-10 font-semibold mb-4 font-erstoria">Ajouter un utilisateur</h1>
                <div className="max-w-2xl mx-auto px-6">
                    <div className="space-y-6">

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="first_name" value="Prénom" />
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={data.first_name}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green"
                                    autoComplete="given-name"
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="name" value="Nom" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green"
                                    autoComplete="family-name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Mot de passe" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="role" value="Rôle" />
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    className="mt-1 block w-full border-brand bg-transparent rounded-md text-brand focus:border-brand-green"
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                >
                                    <option value="user">Utilisateur</option>
                                    <option value="creator">Créateur</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>
                            {data.role === 'user' && (
                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        id="skip_watch_addition"
                                        name="skip_watch_addition"
                                        checked={data.skip_watch_addition}
                                        onChange={(e) => setData('skip_watch_addition', e.target.checked)}
                                        className="rounded border-brand bg-transparent text-brand-green focus:ring-brand-green"
                                    />
                                    <label htmlFor="skip_watch_addition" className="ml-2 text-brand">
                                        Ne pas ajouter de montre à la collection après la création
                                    </label>
                                </div>
                            )}

                            <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="hover-underline ml-auto"
                                    disabled={processing}
                                >
                                    {processing ? 'Création...' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
