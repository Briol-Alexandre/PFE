import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import WatchCard from '@/Components/Watch/Card';
import RepairCardImage from '@/Components/Repairs/CardImage';

export default function Dashboard({ auth, watches, upcoming_repairs, past_repairs }) {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold font-erstoria text-3xl text-brand leading-tight">Bienvenue {user.name}</h2>}
        >
            <Head title="Dashboard Créateur" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <section aria-labelledby="watch-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="sub-title" id="watch-title">Vos montres</h3>
                            <Link
                                href={route('watch.create')}
                                className="hover-underline"
                            >
                                Créer une montre
                            </Link>
                        </div>

                        {watches.length === 0 ? (
                            <p className="text-gray-400">Vous n'avez pas encore créé de montres.</p>
                        ) : (
                            <div className="">
                                <WatchCard watches={watches} />
                            </div>
                        )}
                        <div className="mt-8 flex justify-center">
                            <Link href={route('watch.index')} className="hover-underline">
                                Voir toutes vos montres
                            </Link>
                        </div>
                    </section>
                    <section aria-labelledby="repair-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="sub-title" id="repair-title">Vos révisions</h3>
                            <Link href={route('revision.create')} className="hover-underline">
                                Nouvelle révision
                            </Link>
                        </div>
                        <p>Entretiens demandés</p>
                        {upcoming_repairs.length > 0 ? (
                            <>
                                <RepairCardImage repairs={upcoming_repairs} userRole={user.role} />
                            </>
                        ) : (
                            <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
                        )}
                        <p>Entretiens passés</p>
                        {past_repairs.length > 0 ? (
                            <>
                                <RepairCardImage repairs={past_repairs} userRole={user.role} />
                            </>
                        ) : (
                            <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
                        )}
                        <Link href={route('repair.index')} className="hover-underline">
                            Voir toutes vos réparations
                        </Link>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
