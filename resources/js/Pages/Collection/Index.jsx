import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from "@inertiajs/react";
import DashboardLayoutCollection from "@/Components/Collection/Dashboard-Layout";

export default function Index({ collections }) {
    const userRole = usePage().props.auth.user.role;

    return (
        <AuthenticatedLayout>
            <Head title="Collections" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutCollection collections={collections} userRole={userRole} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}