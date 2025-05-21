import { Link } from "@inertiajs/react";
import WatchCard from "@/Components/Watch/Card";

export default function DashboardLayoutWatch({ watches, userRole }) {
    return (
        <section aria-labelledby="watches-title" className="overflow-hidden sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold text-brand" id="watches-title">Vos montres</h3>
            </div>
            <div className="space-y-8">
                {watches.length > 0 ? (
                    <div>
                        <WatchCard watches={watches} userRole={userRole} />
                    </div>
                ) : (
                    <p className="text-gray-400">Vous n'avez pas encore de montres.</p>
                )}
            </div>
            {userRole === 'creator' && (
                <Link href={route('watch.create')} className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200">
                    Ajouter une montre
                </Link>
            )}
        </section>
    );
}
