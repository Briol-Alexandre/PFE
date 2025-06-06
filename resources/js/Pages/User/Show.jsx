import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardLayoutWatch from '@/Components/Watch/Dashboard-Layout';
import RepairCardImage from '@/Components/Repairs/CardImage';

export default function Show({ user, watches, repairs }) {
    return (
        <AuthenticatedLayout>
            <Head title={`${user.first_name} ${user.name}`} />

            <div>
                <h1 className="text-5xl text-center my-10 font-semibold mb-4 font-erstoria">
                    {user.first_name} {user.name}
                </h1>

                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    {/* Section Collection */}
                    <section className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-brand mb-8">Collection de l'utilisateur</h2>
                            {watches.length > 0 ? (
                                <DashboardLayoutWatch watches={watches} userRole="creator" isShowUser={true} />
                            ) : (
                                <p className="text-gray-400">Cet utilisateur n'a pas encore de montres.</p>
                            )}
                        </div>
                    </section>

                    {/* Section Réparations */}
                    <section className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-brand mb-8">Historique des réparations</h2>
                            {repairs.length > 0 ? (
                                <div className="space-y-6">
                                    <RepairCardImage repairs={repairs} userRole="creator" showSearch={false} checkUser={false} />
                                </div>
                            ) : (
                                <p className="text-gray-400">Cet utilisateur n'a pas encore de réparations.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
