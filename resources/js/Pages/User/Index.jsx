import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ users }) {
    const { auth } = usePage().props;

    // Grouper les utilisateurs par rôle
    const usersByRole = users.reduce((acc, user) => {
        const role = user.role === 'creator' ? 'Créateurs' : 'Utilisateurs';
        if (!acc[role]) acc[role] = [];
        acc[role].push(user);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout>
            <Head title="Utilisateurs" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold text-brand">Liste des utilisateurs</h3>
                            <Link
                                href={route('users.create')}
                                className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                            >
                                Ajouter un utilisateur
                            </Link>
                        </div>

                        <div className="space-y-8">
                            {Object.entries(usersByRole).map(([role, users]) => (
                                <div key={role} className="space-y-4">
                                    <h4 className="text-xl text-brand">{role}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {users.map(user => {
                                            const CardContent = (
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h5 className="font-semibold text-lg">
                                                            {user.first_name} {user.name}
                                                            {user.id === auth.user.id && (
                                                                <span className="ml-2 text-sm text-brand-green">(vous)</span>
                                                            )}
                                                        </h5>
                                                        <p className="text-gray-600">{user.email}</p>
                                                    </div>
                                                </div>
                                            );

                                            return user.role === 'user' ? (
                                                <Link
                                                    key={user.id}
                                                    href={route('users.show', user.id)}
                                                    className="block p-4 border border-brand/20 rounded-lg hover:border-brand transition-colors duration-200"
                                                >
                                                    {CardContent}
                                                </Link>
                                            ) : (
                                                <div
                                                    key={user.id}
                                                    className="p-4 border border-brand/20 rounded-lg"
                                                >
                                                    {CardContent}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
