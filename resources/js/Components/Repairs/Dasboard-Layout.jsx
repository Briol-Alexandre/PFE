import { Link } from "@inertiajs/react";
import RepairCard from "./CardImage";

export default function DashboardLayoutRepairs({ upcoming_repairs, past_repairs, userRole }) {
    return (
        <section aria-labelledby="collection-title" className="overflow-hidden shadow-sm sm:rounded-lg p-8">
            <div className="flex justify-between items-center mb-8">
                <h3 className="sub-title" id="collection-title">Vos réparations</h3>
                <Link href={route('repair.create')} className="hover-underline">
                    Nouvelle réparation
                </Link>
            </div>
            <div className="space-y-8">
                {upcoming_repairs.length > 0 ? (
                    <div>
                        <RepairCard repairs={upcoming_repairs} userRole={userRole} showSearch={false} />
                    </div>
                ) : (
                    <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
                )}
            </div>
            <div className="mt-8 flex justify-center">
                <Link href={route('repair.index')} className="hover-underline">
                    Voir toutes vos réparations
                </Link>
            </div>
        </section>
    );
}