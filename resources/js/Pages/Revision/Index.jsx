import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ revisions }) {
    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette révision ?')) {
            router.delete(route('revision.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gérer les révisions" />
            <div>
                <div className="flex justify-between items-center mb-8 lg:px-20 px-10">
                    <h1 className="lg:text-5xl rl:text-4xl text-3xl text-center rl:my-10 font-semibold font-erstoria">Gérer les révisions</h1>
                    <Link
                        href={route('revision.create')}
                        className="hover-underline"
                    >
                        Nouvelle révision
                    </Link>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 px-10">
                    <div className="overflow-hidden shadow-sm lg:rounded-lg p-6">
                        {revisions.length === 0 ? (
                            <p className="text-gray-400">Aucune révision n'a été créée.</p>
                        ) : (
                            <div className="space-y-4">
                                {revisions.map((revision) => (
                                    <div
                                        key={revision.id}
                                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                                    >
                                        <div>
                                            <h3 className="rl:text-lg text-base font-semibold text-white">{revision.name}</h3>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Link
                                                href={route('revision.edit', revision.id)}
                                                className="text-gray-400 hover:text-brand transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(revision.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
