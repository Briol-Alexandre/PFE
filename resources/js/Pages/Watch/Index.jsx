import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardLayoutWatch from "@/Components/Watch/Dashboard-Layout";

export default function Index({ watches }) {
    const userRole = usePage().props.auth.user.role;

    return (
        <AuthenticatedLayout>
            <Head title="Montres" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutWatch watches={watches} userRole={userRole} />
                </div>
                {userRole === 'creator' && (
                    <Link href={route('watch.create')} className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200 flex justify-center w-fit mx-auto mt-10">
                        Ajouter une montre
                    </Link>
                )}
            </div>
        </AuthenticatedLayout>
    );
}