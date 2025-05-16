import { Link } from "@inertiajs/react";
import RepairCard from "./CardImage";

export default function DashboardLayoutRepairs({ upcoming_repairs, past_repairs, userRole }) {
    return (
        <section aria-labelledby="collection-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold text-brand" id="collection-title">Vos réparations</h3>
            </div>
            <div className="space-y-8">
                {upcoming_repairs.length > 0 && (
                    <div>
                        <h3 className="text-xl text-brand mb-4">Réparations à venir</h3>
                        <RepairCard repairs={upcoming_repairs} userRole={userRole} />
                    </div>
                )}
                {past_repairs.length > 0 && (
                    <div>
                        <h3 className="text-xl text-brand mb-4">Réparations passées</h3>
                        <RepairCard repairs={past_repairs} userRole={userRole} />
                    </div>
                )}
                {!upcoming_repairs.length && !past_repairs.length && (
                    <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
                )}
            </div>
            <Link href={route('repair.create')} className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200">
                Ajouter une réparation
            </Link>

            <div className="mt-8 flex justify-center">
                <Link href={route('repair.index')} className="hover-underline">
                    Voir toutes vos réparations
                </Link>
            </div>
        </section>
    );
}