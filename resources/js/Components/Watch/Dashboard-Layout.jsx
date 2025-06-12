import { Link } from "@inertiajs/react";
import WatchCardDashboard from "@/Components/Watch/CardDashboard";

export default function DashboardLayoutWatch({ watches, userRole, isDashboard = false, isShowUser = false }) {
    return (
        <section aria-labelledby="watches-title" className="overflow-hidden sm:rounded-lg px-6">
            <div className={isDashboard ? 'flex items-center mb-8 justify-between' : 'flex items-center mb-8 justify-center'}>
                <h3 className={isDashboard ? "text-2xl font-semibold text-brand" : isShowUser ? "hidden" : "title text-center"} id="watches-title">Vos montres</h3>
                {isDashboard && userRole === 'creator' && (
                    <Link href={route('watch.create')} className="hover-underline">
                        Ajouter une montre
                    </Link>
                )}
            </div>
            <div className="space-y-8">
                {watches.length > 0 ? (
                    <div>
                        <WatchCardDashboard watches={watches} userRole={userRole} />
                    </div>
                ) : (
                    <p className="text-gray-400 text-center">Vous n'avez pas encore de montres.</p>
                )}
            </div>
        </section>
    );
}
