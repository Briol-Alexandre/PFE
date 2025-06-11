import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function SetEstimate({ repair }) {
    const { data, setData, patch, processing, errors } = useForm({
        proposed_dates: repair.proposed_dates || [''],
        price: repair.price || '',
        status: 'pending',
        refuse_reason: '',
        modify_reason: '',
    });

    const formatDateForInput = (isoDate) => {
        if (!isoDate) return '';
        return isoDate.substring(0, 16); // Format YYYY-MM-DDTHH:mm
    };

    const formatDateForSubmit = (inputDate) => {
        if (!inputDate) return '';
        return new Date(inputDate).toISOString();
    };

    const addDate = () => {
        if (data.proposed_dates.length < 3) {
            setData('proposed_dates', [...data.proposed_dates, '']);
        }
    };

    const removeDate = (index) => {
        const newDates = data.proposed_dates.filter((_, i) => i !== index);
        setData('proposed_dates', newDates);
    };

    const updateDate = (index, value) => {
        console.log('Mise à jour de la date:', { index, value });
        const newDates = [...data.proposed_dates];
        newDates[index] = value;
        setData('proposed_dates', newDates);
        console.log('Nouvelles dates:', newDates);
    };

    const submit = (e) => {
        e.preventDefault();

        // Vérifier qu'il y a au moins une date
        if (!data.proposed_dates.some(date => date)) {
            alert('Veuillez proposer au moins une date');
            return;
        }

        // Vérifier que le prix est renseigné
        if (!data.price) {
            alert('Veuillez indiquer un prix');
            return;
        }

        // Formater les dates avant l'envoi
        const formattedDates = data.proposed_dates
            .filter(date => date) // Enlever les dates vides
            .map(date => date); // Ne pas convertir en ISO, garder le format d'origine

        const formData = {
            ...data,
            proposed_dates: formattedDates,
            _method: 'PATCH',
            price: parseInt(data.price, 10) // Convertir le prix en nombre
        };

        console.log('Données envoyées:', formData);

        patch(route('repair.update_estimate', repair.id), formData, {
            onSuccess: () => {
                console.log('Succès!');
                window.location.reload(); // Recharger la page en cas de succès
            },
            onError: (errors) => {
                console.error('Erreurs:', errors);
                if (errors && typeof errors === 'object') {
                    alert(Object.values(errors).join('\n')); // Afficher les erreurs
                } else {
                    alert('Une erreur est survenue');
                }
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Accepter la réparation" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <p className="text-xl text-gray-400">Col&MacArthur</p>
                                    <h2 className="text-4xl font-erstoria text-brand">{repair.collection.watch.model}</h2>
                                </div>
                            </div>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <InputLabel value="Dates et heures proposées" />
                                        {data.proposed_dates.length < 3 && (
                                            <button
                                                type="button"
                                                onClick={addDate}
                                                className="text-sm text-brand hover:text-brand/80"
                                            >
                                                + Ajouter une date
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2 mt-1">
                                        {data.proposed_dates.map((date, index) => (
                                            <div key={index} className="flex gap-2 items-center">
                                                <TextInput
                                                    type="datetime-local"
                                                    value={formatDateForInput(date)}
                                                    className="block w-full bg-transparent"
                                                    onChange={e => updateDate(index, e.target.value)}
                                                />
                                                {data.proposed_dates.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeDate(index)}
                                                        className="text-red-500 hover:text-red-400"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {errors.proposed_dates && <InputError message={errors.proposed_dates} />}
                                </div>

                                <div>
                                    <InputLabel htmlFor="price" value="Prix estimé" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full bg-transparent"
                                        onChange={e => setData('price', e.target.value)}
                                    />
                                    {errors.price && <InputError message={errors.price} />}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200"
                                        disabled={processing}
                                    >
                                        Valider l'estimation
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
