import TextSection from './text-section';
import { Link } from '@inertiajs/react';

export default function ULTextSection() {
    return (
        <>
            <ul className="flex flex-col gap-10 rg:gap-32 rg:mb-40">
                <TextSection title="Enregistrez vos montres"
                    text="Enregistrez les informations essentielles telles que le modèle, le type de bracelet, la taille du cadran, le type de mouvement, la date d’achat et la garantie."
                    index={1} />
                <TextSection title="Demandez une réparation"
                    text="Précisez le type de réparation dont vous avez besoin ainsi qu'une description afin d'aider votre horloger à effectuer la réparation."
                    index={2} />
                <TextSection title="Gagnez du temps"
                    text="Grâce à notre système, vous n'avez plus besoin de vous soucier des rendez-vous de réparation. La communication entre le client et l'horloger est simple et rapide."
                    index={3} />
                <TextSection title="Gardez une trace"
                    text="Chaque intervention est enregistrée et vous pouvez consulter l'historique de chaque montre."
                    index={4} />
                <TextSection title="Contemplez votre collection"
                    text="Grâce à notre système, vous pouvez enregistrer toutes vos Col&MacArthur et retrouver facilement vos montres."
                    index={5} />
            </ul>
            <div className="flex flex-col justify-center mt-16 w-fit mx-auto text-center">
                <p className="font-erstoria rg:text-4.5xl md:text-3xl text-2xl underline underline-offset-8 decoration-2 decoration-brand-green mb-4">Rejoignez nous sans attendre</p>
                <p className="font-just-sans rg:text-2xl md:text-xl text-base w-2/3 rg:w-1/2 mx-auto text-brand font-light">Connectez-vous et ou creez un compte afin que vos montres ne subissent plus l'effet du temps</p>
                <Link href="/login" className="hover-underline mx-auto w-fit mt-10">Se connecter</Link>
            </div>
        </>
    );
}