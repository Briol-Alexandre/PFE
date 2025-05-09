import CollectionCard from "./Card";
import { Link } from "@inertiajs/react";

export default function DashboardLayoutCollection({ collections }) {
    return (
        <section aria-labelledby="collection-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold text-brand" id="collection-title">Votre collection</h3>
                <Link
                    href={route('collection.create')}
                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                >
                    Ajouter une montre
                </Link>
            </div>

            {collections.length === 0 ? (
                <p className="text-gray-400">Vous n'avez pas encore de montres dans votre collection.</p>
            ) : (
                <div className="">
                    <CollectionCard collections={collections} />
                </div>
            )}

            <div className="mt-8 flex justify-center">
                <Link href={route('collection.index')} className="hover-underline">
                    Voir toute votre collection
                </Link>
            </div>
        </section>
    );
}