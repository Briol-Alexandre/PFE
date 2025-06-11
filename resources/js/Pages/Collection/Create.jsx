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
        selected_strap: '',
        selected_size: '',
        selected_movement: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('collection.store'));
    };

    const handleChange = (e) => {
        if (e.target) {
            const { name, value, type, files } = e.target;
            setData(name, type === 'file' ? files[0] : value);
        } else {
            // Gestion des changements de Select
            const { name, value } = e;
            setData(name, value);
        }
    };

    const handleWatchSelect = (selectedOption) => {
        setData('watch_id', selectedOption ? selectedOption.value : '');
    };

    return (
        <AuthenticatedLayout>
            <Head title="Ajouter une montre" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-black/20 backdrop-blur-3xl overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-start mb-8 border-b border-brand-green pb-4">
                            <h1 className="text-4xl font-erstoria text-brand">Ajouter une montre à ma collection</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                            backgroundColor: 'transparent',
                                            borderColor: '#EAEAE5',
                                            borderRadius: '0.375rem',
                                            color: '#EAEAE5',
                                            '&:hover': {
                                                borderColor: '#EAEAE5'
                                            }
                                        }),
                                        menu: (base) => ({
                                            ...base,
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            backdropFilter: 'blur(12px)'
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? 'rgba(234, 234, 229, 0.1)' : 'transparent',
                                            color: '#EAEAE5',
                                            '&:hover': {
                                                backgroundColor: 'rgba(234, 234, 229, 0.1)'
                                            }
                                        }),
                                        singleValue: (base) => ({
                                            ...base,
                                            color: '#EAEAE5'
                                        }),
                                        input: (base) => ({
                                            ...base,
                                            color: '#EAEAE5'
                                        }),
                                        placeholder: (base) => ({
                                            ...base,
                                            color: '#EAEAE5'
                                        })
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
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green focus:ring-brand-green [&::-webkit-calendar-picker-indicator]:text-brand [&::-webkit-calendar-picker-indicator]:filter-brand"
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
                                    className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green focus:ring-brand-green [&::-webkit-calendar-picker-indicator]:text-brand [&::-webkit-calendar-picker-indicator]:filter-brand"
                                />
                                {errors.warranty_end_date && <InputError message={errors.warranty_end_date} />}
                            </div>

                            <div>
                                <InputLabel htmlFor="warranty_image" value="Photo de la garantie" />
                                <div className="mt-1 flex items-center justify-center w-full">
                                    <label htmlFor="warranty_image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-brand border-dashed rounded-lg cursor-pointer bg-transparent hover:bg-brand/5 transition-all duration-200">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-brand"><span className="font-semibold">Cliquez pour uploader</span></p>
                                            <p className="text-xs text-brand/70">PNG, JPG (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="warranty_image"
                                            id="warranty_image"
                                            onChange={handleChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                {errors.warranty_image && <InputError message={errors.warranty_image} />}
                            </div>

                            {data.watch_id && watches.find(watch => watch.id === data.watch_id) && (
                                <>
                                    <div>
                                        <InputLabel htmlFor="selected_strap" value="Bracelet" />
                                        <select
                                            name="selected_strap"
                                            id="selected_strap"
                                            value={data.selected_strap}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green focus:ring-brand-green [&::-webkit-calendar-picker-indicator]:text-brand [&::-webkit-calendar-picker-indicator]:filter-brand"
                                        >
                                            <option value="">Sélectionnez un bracelet</option>
                                            {watches.find(watch => watch.id === data.watch_id).available_straps.map((strap, index) => (
                                                <option key={index} value={strap}>{strap}</option>
                                            ))}
                                        </select>
                                        {errors.selected_strap && <InputError message={errors.selected_strap} />}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="selected_size" value="Taille du cadran" />
                                        <select
                                            name="selected_size"
                                            id="selected_size"
                                            value={data.selected_size}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green focus:ring-brand-green [&::-webkit-calendar-picker-indicator]:text-brand [&::-webkit-calendar-picker-indicator]:filter-brand"
                                        >
                                            <option value="">Sélectionnez une taille</option>
                                            {watches.find(watch => watch.id === data.watch_id).available_sizes.map((size, index) => (
                                                <option key={index} value={size}>{size}</option>
                                            ))}
                                        </select>
                                        {errors.selected_size && <InputError message={errors.selected_size} />}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="selected_movement" value="Type de mouvement" />
                                        <select
                                            name="selected_movement"
                                            id="selected_movement"
                                            value={data.selected_movement}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md bg-transparent border-brand text-brand shadow-sm focus:border-brand-green focus:ring-brand-green [&::-webkit-calendar-picker-indicator]:text-brand [&::-webkit-calendar-picker-indicator]:filter-brand"
                                        >
                                            <option value="">Sélectionnez un mouvement</option>
                                            {watches.find(watch => watch.id === data.watch_id).available_movements.map((movement, index) => (
                                                <option key={index} value={movement}>{movement}</option>
                                            ))}
                                        </select>
                                        {errors.selected_movement && <InputError message={errors.selected_movement} />}
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-end mt-6">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-transparent border border-brand text-brand rounded-md hover:bg-brand hover:text-black transition-colors duration-200 ml-auto"
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