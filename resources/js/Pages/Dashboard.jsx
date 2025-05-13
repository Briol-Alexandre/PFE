import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardLayoutCollection from '@/Components/Collection/Dashboard-Layout';
import DashboardLayoutRepairs from '@/Components/Repairs/Dasboard-Layout';

export default function Dashboard({ auth, repairs, asked_repairs, upcoming_repairs, past_repairs }) {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold font-erstoria text-3xl text-brand leading-tight">Bienvenue {user.first_name} {user.name}</h2>}
        >
            <Head title="Dashboard" />
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutCollection collections={user.collection} />
                </div>
            </div>
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutRepairs asked_repairs={asked_repairs} upcoming_repairs={upcoming_repairs} past_repairs={past_repairs} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
