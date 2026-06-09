"use client";

import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Text from "./Text";
import Link from "next/link";

export default function Header() {
    const { isLog, user } = useAuth();

    return (
        <header className="w-full border-b border-slate-200/80 bg-(--color-white-break) sticky top-0 z-50 transition-all duration-300 px-6 py-2.5 backdrop-blur-md bg-opacity-95">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
                <div className="flex gap-8 items-center">
                    <Link href="/" className="transition-transform duration-200 hover:scale-105 flex items-center">
                        <Image 
                            src="/react.jpg" 
                            width={45} 
                            height={45} 
                            alt="Image Logo TTF" 
                            className="h-10 w-auto object-contain rounded-lg"
                        />
                    </Link>
                    
                    <nav className="flex gap-6 items-center">
                        <Link 
                            href="/tutoriels" 
                            className="text-(--color-primary) font-semibold hover:text-(--color-secondary) transition-colors duration-200"
                        >
                            <Text name="p">Tutoriels</Text>
                        </Link>
                        <Link 
                            href="/admin" 
                            className="text-slate-500 font-medium hover:text-(--color-primary) transition-colors duration-200"
                        >
                            <Text name="p">Admin ?</Text>
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    {isLog && user && (
                        <Link 
                            href={`/users/${user.id}`} 
                            className="text-slate-600 hover:text-(--color-primary) p-2.5 rounded-full hover:bg-slate-100/80 transition-all duration-300 flex items-center justify-center border border-transparent hover:border-slate-200/60"
                            title="Mon Profil"
                        >
                            <IoMdPerson className="w-5 h-5" />
                        </Link>
                    )}
                    
                    <Link
                        href="/login"
                        className="cursor-pointer bg-(--color-secondary) text-(--color-white-break) py-2 px-4 rounded-xl font-medium shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] hover:brightness-105 active:scale-98 text-center text-sm"
                    >
                        <Text name="p">
                            {isLog ? "Se Déconnecter" : "Se Connecter"}
                        </Text>
                    </Link>
                </div>

            </div>
        </header>
    );
}