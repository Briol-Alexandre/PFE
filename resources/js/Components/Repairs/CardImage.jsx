import { Link } from "@inertiajs/react";
import { getRepairStatusInFrench, getRepairStatusColor } from "@/Utils/repairStatus";

export default function RepairCardImage({ repairs, userRole }) {
    const repairRoute = userRole === 'creator' ? 'repair.show_creator' : 'repair.show';
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
            {repairs.map((repair) => (
                <li key={repair.id} className="bg-black/20 backdrop-blur-3xl lg:max-w-[400px] aspect-square p-10 rounded-3xl hover:bg-white/20 transition-colors duration-300">
                    <Link href={route(repairRoute, { repair: repair.id })} className="flex flex-col gap-4">
                        <p className="text-sm text-brand rounded-full w-fit px-2 py-1 absolute top-4 right-4" style={{ background: getRepairStatusColor(repair.status) }}>{getRepairStatusInFrench(repair.status)}</p>
                        <img src={repair.collection.watch.image} alt={repair.collection.watch.model} className="w-full aspect-square" />
                        <div className='flex flex-col'>
                            <p className="text-lg text-gray-400 leading-5">{repair.collection.watch.creator.name}</p>
                            <p className="text-lg leading-5">{repair.collection.watch.model}</p>
                            <div className="mt-4 space-y-1">
                                <p className="text-sm text-gray-400">Révision : {repair.revisions ? repair.revisions.map(revision => revision.name).join(', ') : 'Aucune révision'}</p>
                                <p className="text-sm text-gray-400">Date : {repair.date ? new Date(repair.date).toLocaleDateString() : 'Non planifiée'}</p>
                                <p className="text-sm text-gray-400">Prix : {repair.price ? repair.price + '€' : 'Non renseigné'}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}