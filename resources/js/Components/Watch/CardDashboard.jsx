import { Link } from "@inertiajs/react";

export default function WatchCardDashboard({ watches }) {
    return (
        <ul className="md:grid flex flex-col items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:px-10">
            {watches.map((watch) => (
                <li key={watch.id} className="bg-black/20 backdrop-blur-3xl max-w-[400px] p-10 rounded-3xl hover:bg-white/20 transition-colors duration-300">
                    <Link href={route('watch.show', { watch: watch.id })} className="flex flex-col gap-4">
                        <div className='flex flex-col text-center gap-2'>
                            <img src={watch.image} alt={watch.model} className="w-full aspect-square" />
                            <p className="text-xl font-semibold font-erstoria leading-5 pt-5">{watch.model}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}