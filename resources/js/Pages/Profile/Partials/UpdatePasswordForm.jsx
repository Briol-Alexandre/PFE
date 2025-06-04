import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-semibold mb-4 font-erstoria text-brand">
                    Modifier le mot de passe
                </h2>

                <p className="text-sm text-brand mb-6">
                    Assurez-vous d'utiliser un mot de passe long et aléatoire pour plus de sécurité.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-brand">Mot de passe actuel</label>
                    <input
                        type="password"
                        name="current_password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    {errors.current_password && <div className="text-red-500 text-sm mt-1">{errors.current_password}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand">Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-brand">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                    {errors.password_confirmation && <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>}
                </div>

                <div className="flex items-center justify-end mt-6">
                    <button
                        type="submit"
                        disabled={processing}
                        className="hover-underline ml-auto"
                    >
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-brand ml-3">Enregistré</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
