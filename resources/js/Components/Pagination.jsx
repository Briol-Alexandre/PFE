import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Si pas de liens ou seulement une page, ne pas afficher la pagination
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center gap-1">
            {links.map((link, key) => {
                // Ne pas afficher les liens "..." (ellipses)
                if (link.label.includes('...')) {
                    return (
                        <span
                            key={key}
                            className="px-4 py-2 text-gray-500"
                        >
                            ...
                        </span>
                    );
                }

                // Afficher les liens actifs et inactifs
                return link.url === null ? (
                    <span
                        key={key}
                        className={`px-4 py-2 text-sm border rounded ${
                            link.active
                                ? 'border-brand bg-brand text-white'
                                : 'border-gray-300 text-gray-500'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded ${
                            link.active
                                ? 'border-brand bg-brand text-white'
                                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                    >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                );
            })}
        </div>
    );
}
