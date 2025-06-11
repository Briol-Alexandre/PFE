import { Link } from "@inertiajs/react";
import { getRepairStatusInFrench, getRepairStatusColor } from "@/Utils/repairStatus";
import { useState } from 'react';

export default function RepairCardImage({ repairs, userRole, searchTerm = '', showSearch = false, setSearchTerm = () => { }, checkUser = true }) {
    const repairRoute = userRole === 'creator' ? 'repair.show_creator' : 'repair.show';

    const filteredRepairs = repairs.filter(repair => {
        if (checkUser && !repair?.collection?.user) return false;
        if (!repair?.collection?.watch) return false;

        if (!showSearch || !searchTerm) return true;

        const searchString = [
            repair.collection.user.name,
            repair.collection.user.first_name,
            repair.collection.user.email,
            repair.collection.watch.model,
            repair.revisions ? repair.revisions.map(r => r.name).join(' ') : ''
        ].filter(Boolean).join(' ').toLowerCase();

        return searchString.includes(searchTerm.toLowerCase());
    });

    const CreatorCard = ({ repair }) => {
        if (!repair?.collection?.user || !repair?.collection?.watch) return null;

        return (
            <li className="bg-black/20 backdrop-blur-3xl hover:bg-white/20 transition-colors duration-300 border-b border-gray-700/50 last:border-b-0">
                <Link href={route(repairRoute, { repair: repair.id })} className="block p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0 space-y-2 md:space-y-0">
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-lg font-medium truncate">
                                    {repair.collection.user.name} {repair.collection.user.first_name || ''}
                                </p>
                                <p className="text-sm text-gray-400 truncate">{repair.collection.user.email || 'Email non renseigné'}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-lg font-medium truncate">{repair.collection.watch.model || 'Modèle non renseigné'}</p>
                                <p className="text-sm text-gray-400 truncate">
                                    {repair.revisions?.length ? repair.revisions.map(revision => revision.name).join(', ') : 'Aucune révision'}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-lg font-medium truncate">{repair.date ? 'Date' : ''}</p>
                                <p className="text-sm text-gray-400 truncate">
                                    {repair.date ? new Date(repair.date).toLocaleDateString() : ''}
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-lg font-medium truncate">{repair.price ? 'Prix' : ''}</p>
                                <p className="text-sm text-gray-400 truncate">
                                    {repair.price ? repair.price + '€' : ''}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-brand rounded-full px-2 py-1 w-fit md:shrink-0" style={{ background: getRepairStatusColor(repair.status) }}>
                            {getRepairStatusInFrench(repair.status)}
                        </p>
                    </div>
                </Link>
            </li>
        );
    };

    const ClientCard = ({ repair }) => (
        <li key={repair.id} className="bg-black/20 backdrop-blur-3xl max-w-[400px] aspect-square p-10 rounded-3xl hover:bg-white/20 transition-colors duration-300">
            <Link href={route(repairRoute, { repair: repair.id })} className="flex flex-col gap-4">
                <p className="text-sm text-brand rounded-full w-fit px-2 py-1 absolute top-4 right-4" style={{ background: getRepairStatusColor(repair.status) }}>
                    {getRepairStatusInFrench(repair.status)}
                </p>
                <img src={repair.collection.watch.image} alt={repair.collection.watch.model} className="w-full aspect-square" />
                <div className='flex flex-col'>
                    <p className="text-lg text-gray-400 leading-5">Col&MacArthur</p>
                    <p className="text-lg leading-5">{repair.collection.watch.model}</p>
                    <div className="mt-4 space-y-1">
                        <p className="text-sm text-gray-400">Révision : {repair.revisions ? repair.revisions.map(revision => revision.name).join(', ') : 'Aucune révision'}</p>
                        <p className="text-sm text-gray-400">Date : {repair.date ? new Date(repair.date).toLocaleDateString() : 'Non planifiée'}</p>
                        <p className="text-sm text-gray-400">Prix : {repair.price ? repair.price + '€' : 'Non renseigné'}</p>
                    </div>
                </div>
            </Link>
        </li>
    );

    if (userRole === 'creator') {
        return (
            <div className="w-full max-w-4xl mx-auto px-2 md:px-6 lg:px-8">
                {showSearch && (
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher une réparation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 rounded-lg bg-black/20 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-brand"
                        />
                    </div>
                )}
                <ul className="rounded-xl overflow-hidden bg-black/20 backdrop-blur-3xl divide-y divide-gray-700/50">
                    {filteredRepairs.map((repair) => (
                        <CreatorCard repair={repair} key={repair.id} />
                    ))}
                    {filteredRepairs.length === 0 && (
                        <li className="p-4 text-gray-400">Aucune réparation trouvée</li>
                    )}
                </ul>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-10">
            {repairs.map((repair) => (
                <ClientCard repair={repair} key={repair.id} />
            ))}
        </ul>
    );
}