"use client";

import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import Text from "./Text";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const { isLog, isAdmin, user, Logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        Logout();
        router.push("/");
    };

    return (
        <header className="w-full border-b border-slate-200/80 bg-(--color-white-break) sticky top-0 z-50 transition-all duration-300 px-6 py-2.5 backdrop-blur-md bg-opacity-95">
            <div className="max-w-6xl mx-auto flex justify-between items-center gap-6">
                <div className="flex gap-8 items-center">
                    <Link href="/" className="transition-transform duration-200 hover:scale-105 flex items-center">
                        <Image src="/TTF_logo.png" alt="Image Logo TTF" width={120} height={40} className="h-10 w-auto object-contain" />
                    </Link>
                    
                    <nav className="flex gap-6 items-center">
                        <Link 
                            href="/tutoriels" 
                            className="text-(--color-primary) font-semibold hover:text-(--color-secondary) transition-colors duration-200"
                        >
                            <Text name="p">Tutoriels</Text>
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="rounded-full bg-(--color-primary) px-4 py-2 text-white text-sm font-semibold shadow-sm transition-transform duration-200 hover:scale-[1.02]"
                            >
                                Admin
                            </Link>
                        )}
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
                    {isLog ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="cursor-pointer bg-(--color-secondary) text-(--color-white-break) py-2 px-4 rounded-xl font-medium shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] hover:brightness-105 active:scale-98 text-center text-sm"
                        >
                            <Text name="p">Se Déconnecter</Text>
                        </button>
                    ) : (
                        <Link
                            href="/login"
                            className="cursor-pointer bg-(--color-secondary) text-(--color-white-break) py-2 px-4 rounded-xl font-medium shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] hover:brightness-105 active:scale-98 text-center text-sm"
                        >
                            <Text name="p">Se Connecter</Text>
                        </Link>
                    )}
                </div>

            </div>
        </header>
    );
}