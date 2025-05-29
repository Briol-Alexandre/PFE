import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import { Transition } from '@headlessui/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../../css/calendar.css';

const locales = {
    'fr': fr,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => {
        return startOfWeek(new Date(), { locale: fr });
    },
    getDay,
    locales,
});

// Formats personnalisés pour l'affichage des dates
const formats = {
    timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, 'HH:mm', culture),
    eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
        localizer.format(start, 'HH:mm', culture) + ' – ' +
        localizer.format(end, 'HH:mm', culture),
    dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
        localizer.format(start, 'dd MMMM', culture) + ' – ' +
        localizer.format(end, 'dd MMMM', culture),
};

export default function RepairCalendar({ auth, repairs, userRole }) {
    const [tooltipEvent, setTooltipEvent] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const events = repairs.map(repair => ({
        id: repair.id,
        title: repair.title,
        start: new Date(repair.start),
        end: new Date(repair.end),
        status: repair.status,
        description: repair.description,
        resource: repair
    }));

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: getStatusColor(event.status),
            borderRadius: '5px',
            opacity: 0.8,
            color: '#1F2937',
            border: '0',
            display: 'block'
        };
        return {
            style
        };
    };

    const getStatusColor = (status) => {
        const colors = {
            'asked': '#fef08a',
            'pending': '#fef08a',
            'in_progress': '#bfdbfe',
            'accepted': '#bfdbfe',
            'completed': '#bbf7d0',
            'refused': '#fecaca',
            'modified': '#bbf7d0',
            'canceled': '#fecaca'
        };
        return colors[status] || '#e5e7eb';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Calendrier des réparations</h2>}
        >
            <Head title="Calendrier des réparations" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <div className="h-[600px]">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                                eventPropGetter={eventStyleGetter}
                                formats={formats}
                                culture="fr"
                                messages={{
                                    next: 'Suivant',
                                    previous: 'Précédent',
                                    today: 'Aujourd\'hui',
                                    month: 'Mois',
                                    week: 'Semaine',
                                    day: 'Jour',
                                    agenda: 'Agenda',
                                    date: 'Date',
                                    time: 'Heure',
                                    event: 'Événement',
                                    noEventsInRange: 'Aucune réparation sur cette période',
                                    allDay: 'Journée entière',
                                    work_week: 'Semaine de travail',
                                    yesterday: 'Hier',
                                    tomorrow: 'Demain',
                                    showMore: (total) => `+${total} autres`,
                                }}
                                onSelectEvent={(event) => {
                                    const routeName = userRole === 'creator' ? 'repair.show_creator' : 'repair.show';
                                    window.location = route(routeName, event.id);
                                }}
                                onSelectSlot={() => setTooltipEvent(null)}
                                onNavigate={() => setTooltipEvent(null)}
                                components={{
                                    eventWrapper: ({ event, children }) => (
                                        <div
                                            onMouseEnter={(e) => {
                                                setTooltipEvent(event);
                                                setTooltipPosition({
                                                    x: e.clientX,
                                                    y: e.clientY
                                                });
                                            }}
                                            onMouseLeave={() => setTooltipEvent(null)}
                                        >
                                            {children}
                                        </div>
                                    )
                                }}
                            />
                        </div>

                        <Transition
                            show={tooltipEvent !== null}
                            as="div"
                            className="relative"
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Transition.Child
                                as="div"
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                {tooltipEvent && (
                                    <div
                                        style={{
                                            position: 'fixed',
                                            left: `${tooltipPosition.x + 10}px`,
                                            top: `${tooltipPosition.y + 10}px`,
                                        }}
                                        className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 z-50 max-w-sm whitespace-pre-line text-white"
                                    >
                                        {tooltipEvent.description}
                                    </div>
                                )}
                            </Transition.Child>
                        </Transition>

                        <div className="mt-4 flex gap-4 justify-end bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
                                <span className="text-white">Acceptée</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-blue-200 rounded mr-2"></div>
                                <span className="text-white">En cours</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-200 rounded mr-2"></div>
                                <span className="text-white">Terminée</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
