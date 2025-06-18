import React from 'react';
import { Link } from '@inertiajs/react';

export default function NotificationBadge({ count }) {
    if (count <= 0) {
        return null;
    }

    return (
        <div className="absolute -top-1 -right-1">
            <div className="flex items-center justify-center bg-red-500 text-white rounded-full w-5 h-5 text-xs font-bold">
                {count > 9 ? '9+' : count}
            </div>
        </div>
    );
}
