import Image from "next/image";

export default function Header() {
    return (
        <header className="min-w-full border-b border-gray-200 flex px-4 sticky top-0 z-0">
            <Image src="/react.jpg" width={100} height={100} alt="Image Logo TTF" className="flex justify-start"/>
            <div className="flex gap-8 justify-center">
                <a href="" className="text-(--color-primary)">Tutos</a>
                <a href="" className="text-(--color-black-break)">Admin ?</a>
            </div>
            <div className="flex justify-end justify-self-end">
                <a href="" className="text-(--color-black-break)">svg profil ?</a>
                <a href="" className="bg-(--color-secondary) text-(--color-white-break) p-2 px-3 rounded-md">Se Connecter / Se Déconnecter</a>
            </div>
        </header>
    )
}