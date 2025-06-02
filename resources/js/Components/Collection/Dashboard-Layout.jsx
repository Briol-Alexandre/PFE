import CollectionCard from "./Card";
import { Link } from "@inertiajs/react";

export default function DashboardLayoutCollection({ collections }) {
    return (
        <section aria-labelledby="collection-title" className="overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="sub-title" id="collection-title">Votre collection</h3>
                <Link
                    href={route('collection.create')}
                    className="hover-underline"
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