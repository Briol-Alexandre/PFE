import TextSection from './text-section';
import { Link } from '@inertiajs/react';

export default function ULTextSection() {
    return (
        <>
            <ul className="flex flex-col gap-10 rg:gap-32 rg:mb-40">
                <TextSection title="Enregistrez vos montres"
                    text="Enregistrez les informations essentielles telles que la marque, 
                le modèle, le numéro de série, la date d’achat, l’état actuel, 
                la garantie et l’historique des révisions. "
                    index={1} />
                <TextSection title="Restez averti"
                    text="Précisez les réparations à effectuer sur chaque montre, renseignez-y la date à laquelle elle est prévue et nous vous enverrons une notification lorque le rendez-vous approche."
                    index={2} />
                <TextSection title="Gagnez du temps"
                    text="Grâce à notre système, vous n'avez plus besoin de vous soucier des rendez-vous de réparation."
                    index={3} />
                <TextSection title="Gardez une trace"
                    text="Chaque intervention est enregistrée et vous pouvez consulter l'historique de chaque montre."
                    index={4} />
                <TextSection title="Apprenez à réparer"
                    text="Grâce à nos tutoriels, vous pouvez apprendre à faire les réparations basiques sur vos montres."
                    index={5} />
            </ul>
            <div className="flex flex-col justify-center mt-16 w-fit mx-auto text-center">
                <p className="font-erstoria rg:text-4.5xl md:text-3xl text-2xl underline decoration-brand-red text-brand">Rejoignez nous sans attendre</p>
                <p className="font-just-sans rg:text-2xl md:text-xl text-base w-2/3 rg:w-1/2 mx-auto text-brand font-light">Connectez-vous et ou creez un compte afin que vos montres ne subissent plus l'effet du temps</p>
                <Link href="/register" className="hover-underline mx-auto w-fit mt-10">Créer un compte</Link>
            </div>
        </>
    );
}