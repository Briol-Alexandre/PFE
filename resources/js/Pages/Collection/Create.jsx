import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Select from 'react-select';

export default function Create({ watches }) {
    const { data, setData, post, processing, errors } = useForm({
        watch_id: '',
        purchase_date: '',
        warranty_end_date: '',
        warranty_image: null,
        user_id: usePage().props.auth.user.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('collection.store'));
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    const handleWatchSelect = (selectedOption) => {
        setData('watch_id', selectedOption ? selectedOption.value : '');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter une montre" />
            <div>
                <h1 className="lg:text-5xl rl:text-4xl text-3xl text-center rl:my-10  font-semibold font-erstoria">Ajouter une montre à ma collection</h1>
                <div className="max-w-2xl mx-auto px-6">
                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6 py-10">
                            <div>
                                <InputLabel htmlFor="watch_id" value="Sélectionner une montre" />
                                <Select
                                    id="watch_id"
                                    name="watch_id"
                                    value={watches.find(watch => watch.id === data.watch_id) ? {
                                        value: data.watch_id,
                                        label: `${watches.find(watch => watch.id === data.watch_id).creator.name} - ${watches.find(watch => watch.id === data.watch_id).model}`
                                    } : null}
                                    onChange={handleWatchSelect}
                                    options={watches.map(watch => ({
                                        value: watch.id,
                                        label: `${watch.creator.name} - ${watch.model}`
                                    }))}
                                    placeholder="Rechercher une montre..."
                                    isClearable
                                    className="mt-1"
                                    noOptionsMessage={() => "Aucune montre trouvée"}
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            backgroundColor: '#374151',
                                            borderColor: '#4B5563',
                                            '&:hover': {
                                                borderColor: '#6366F1'
                                            }
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: '#374151'
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#4B5563'
                                            }
                                        }),
                                        singleValue: (base) => ({
                                            ...base,
                                            color: 'white'
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: 'white'
                                        }),

                                    }}
                                />
                                {errors.watch_id && <InputError message={errors.watch_id} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="purchase_date" value="Date d'achat" />
                                <input
                                    type="date"
                                    name="purchase_date"
                                    id="purchase_date"
                                    value={data.purchase_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.purchase_date && <InputError message={errors.purchase_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="warranty_end_date" value="Date de fin de garantie" />
                                <input
                                    type="date"
                                    name="warranty_end_date"
                                    id="warranty_end_date"
                                    value={data.warranty_end_date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                {errors.warranty_end_date && <InputError message={errors.warranty_end_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="warranty_image" value="Image de la garantie" />
                                <input
                                    type="file"
                                    name="warranty_image"
                                    id="warranty_image"
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                                    accept="image/*"
                                />
                                {errors.warranty_image && <InputError message={errors.warranty_image} />}
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="hover-underline ml-auto"
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter à ma collection'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}