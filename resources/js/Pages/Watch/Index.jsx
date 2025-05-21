import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardLayoutWatch from "@/Components/Watch/Dashboard-Layout";

export default function Index({ watches }) {
    const userRole = usePage().props.auth.user.role;

    return (
        <AuthenticatedLayout>
            <Head title="Montres" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutWatch watches={watches} userRole={userRole} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}