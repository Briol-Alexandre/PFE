import { Link } from "@inertiajs/react";

export default function WatchCard({ watches }) {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
            {watches.map((watch) => (
                <li key={watch.id} className="bg-black/20 backdrop-blur-3xl lg:max-w-[400px] aspect-square p-10 rounded-3xl hover:bg-white/20 transition-colors duration-300">
                    <Link href={route('watch.show', { watch: watch.id })} className="flex flex-col gap-4">
                        <img src={watch.image} alt={watch.model} className="w-full aspect-square" />
                        <div className='flex flex-col'>
                            <p className="text-lg text-gray-400 leading-5">{watch.creator.name}</p>
                            <p className="text-lg leading-5">{watch.model}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}