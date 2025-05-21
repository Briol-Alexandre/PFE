import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";
import RepairCard from '@/Components/Repairs/CardImage';
import { usePage } from "@inertiajs/react";
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Link } from "@inertiajs/react";

export default function Index({ repairs, asked_repairs, upcomming_repairs, past_repairs, rejected_repairs, in_progress_repairs, pending_repairs }) {
    const [categories] = useState([
        { name: 'Toutes', repairs: repairs },
        { name: 'Demandées', repairs: asked_repairs },
        { name: 'En attente', repairs: pending_repairs },
        { name: 'À venir', repairs: upcomming_repairs },
        { name: 'En cours', repairs: in_progress_repairs },
        { name: 'Passées', repairs: past_repairs },
        { name: 'Refusées', repairs: rejected_repairs },
    ]);

    return (
        <AuthenticatedLayout>
            <Head title="Réparations" />
            <div>
                <h1 className="text-5xl text-center my-10 font-semibold mb-4 font-erstoria">Réparations</h1>

                <Tab.Group>
                    <div className="w-full max-w-4xl mx-auto px-2 sm:px-6 lg:px-8">
                        <Tab.List className="flex space-x-1 rounded-xl bg-brand/20 p-1">
                            {categories.map((category) => (
                                <Tab
                                    key={category.name}
                                    className={({ selected }) =>
                                        `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                                        ${selected
                                            ? 'bg-black/40 text-brand shadow'
                                            : 'text-brand/40 hover:bg-black/[0.12] hover:text-brand'}
                                        `
                                    }
                                >
                                    {category.name}
                                </Tab>
                            ))}
                        </Tab.List>
                    </div>
                    <Tab.Panels className="mt-6 w-full px-2 sm:px-6 lg:px-8">
                        {categories.map((category, idx) => (
                            <Tab.Panel
                                key={idx}
                            >
                                <RepairCard repairs={category.repairs} userRole={usePage().props.auth.user.role} />
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            {usePage().props.auth.user.role !== 'creator' && (
                <Link
                    href={route('repair.create')}
                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                >
                    Créer une réparation
                </Link>
            )}
        </AuthenticatedLayout>
    );
}