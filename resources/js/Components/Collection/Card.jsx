import { Link } from "@inertiajs/react";

export default function CollectionCard({ collections }) {
    return (
        <ul className="md:grid flex flex-col items-center md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-10">
            {collections.map((collection) => (
                <li key={collection.id} className="bg-black/20 backdrop-blur-3xl max-w-[400px] py-5 px-10 rounded-3xl hover:bg-white/20 transition-colors duration-300">
                    <Link href={route('collection.show', { collection: collection.id })} className="flex flex-col gap-4">
                        <img src={collection.watch.image} alt={collection.watch.model} className="w-full aspect-square" />
                        <div className='flex flex-col'>
                            <p className="text-lg text-gray-400 leading-5">Col&MacArthur</p>
                            <p className="text-lg leading-5">{collection.watch.model}</p>
                            <div className="mt-4 space-y-1">
                                <p className="text-sm text-gray-400">Acheté le : {!collection.purchase_date ? 'Non renseigné' : new Date(collection.purchase_date).toLocaleDateString()}</p>
                                <p className="text-sm text-gray-400">Garantie jusqu'au : {!collection.warranty_end_date ? 'Non renseigné' : new Date(collection.warranty_end_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}