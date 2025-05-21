import { Link } from "@inertiajs/react";
import { getRepairStatusInFrench, getRepairStatusColor } from "@/Utils/repairStatus";

export default function RepairCard({ repairs, userRole }) {
    const repairRoute = userRole === 'creator' ? 'repair.show_creator' : 'repair.show';
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
            {repairs.map((repair) => (
                <li key={repair.id} className="bg-black/20 backdrop-blur-3xl lg:max-w-[400px] p-10 rounded-3xl hover:bg-white/20 transition-colors duration-300 relative">
                    <Link href={route(repairRoute, { repair: repair.id })} className="flex flex-col gap-4">
                        <div className='flex flex-col'>
                            <p className="text-sm text-brand rounded-full w-fit px-2 py-1 absolute top-6 right-6" style={{ background: getRepairStatusColor(repair.status) }}>{getRepairStatusInFrench(repair.status)}</p>
                            <div className="mt-4 space-y-1">
                                <p className="text-xl text-brand font-bold">{repair.revisions ? repair.revisions.map(revision => revision.name).join(', ') : 'Aucune révision'}</p>
                                <p className="text-lg text-gray-400">Date : {repair.date ? new Date(repair.date).toLocaleDateString() : 'Non planifiée'}</p>
                                <p className="text-lg text-gray-400">Prix : {repair.price ? repair.price + '€' : 'Non renseigné'}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}