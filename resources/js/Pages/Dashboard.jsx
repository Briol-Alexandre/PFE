import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DashboardLayoutCollection from '@/Components/Collection/Dashboard-Layout';
import DashboardLayoutRepairs from '@/Components/Repairs/Dasboard-Layout';

export default function Dashboard({ auth, upcoming_repairs, past_repairs }) {
    const user = auth.user;
    console.log(upcoming_repairs);

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="title text-left">Bienvenue {user.first_name} {user.name}</h2>}
        >
            <Head title="Dashboard" />
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutCollection collections={user.collection} />
                </div>
            </div>
            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutRepairs upcoming_repairs={upcoming_repairs} past_repairs={past_repairs} userRole={user.role} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
