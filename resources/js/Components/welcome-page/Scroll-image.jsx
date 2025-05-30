export default function ScrollImage({ className }) {
    return (
        <div className={`flex flex-col items-center gap-4 mt-20 ${className}`}>
            <div id="callToScroll"></div>
            <p className="text-sm font-just-sans text-brand w-2/3 text-center">Défilez pour continuer&nbsp;!</p>
        </div>
    );
}