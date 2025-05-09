import { Link } from "@inertiajs/react";

export default function DashboardLayoutRepairs({ /* repairs */ }) {
    return (
        <section aria-labelledby="collection-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold text-brand" id="collection-title">Vos réparations</h3>
            </div>
            <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>

            {/* {repairs.length === 0 ? (
                <p className="text-gray-400">Vous n'avez pas encore de réparations.</p>
            ) : (
                <div className="">
                    <CollectionCard collections={repairs} />
                </div>
            )} */}

            <div className="mt-8 flex justify-center">
                <Link className="hover-underline">
                    Voir toutes vos réparations
                </Link>
            </div>
        </section>
    );
}