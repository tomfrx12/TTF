"use client";

import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { isLog, Login, Logout } = useAuth();

    return (
        <header className="min-w-full border-b border-gray-200 flex justify-between items-center gap-6 px-4 sticky top-0 z-0 transition-all">
            <div className="flex gap-8 items-center">
                <Image src="/react.jpg" width={100} height={100} alt="Image Logo TTF" className="flex py-2"/>
                <div className="flex gap-8 justify-center">
                    <a href="" className="text-(--color-primary)">Tutos</a>
                    <a href="" className="text-(--color-black-break)">Admin ?</a>
                </div>
            </div>
            <div className="flex gap-4">
                <a href="" className={`${isLog ? "text-(--color-black-break) self-center duration-500 hover:scale-110" : "hidden"}`}>
                    <IoMdPerson />
                </a>
                
                <button
                    className="cursor-pointer bg-(--color-secondary) text-(--color-white-break) p-2 px-3 rounded-md duration-400 hover:scale-102"
                    onClick={() => (isLog ? Logout() : Login())}
                >
                    {isLog ? "Se Déconnecter" : "Se Connecter"}
                </button>
            </div>
        </header>
    )
}