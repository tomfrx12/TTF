"use client";

import { FaGithub, FaInstagram } from "react-icons/fa";
import Text from "./Text";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-(--color-primary) border-t border-slate-700/40 py-8 px-6 transition-all mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                <Link href="/mentions-legales" className="text-(--color-white-break)/90 text-sm font-medium transition-all duration-300 hover:text-(--color-secondary) hover:scale-105">Mentions Légales</Link>
                <div className="flex flex-col items-center gap-3 order-first sm:order-0">
                    <Text name="p" className="text-(--color-white-break) text-sm font-medium tracking-wide">Suivez-nous sur</Text>
                    <div className="flex items-center gap-6">
                        <Link href="https://www.instagram.com/fourneauxtom" target="_blank" className="group">
                            <FaInstagram className="w-6 h-6 text-(--color-white-break)/80 transition-all duration-300 group-hover:text-(--color-secondary) group-hover:scale-110"/>
                        </Link>
                        <Link href="https://github.com/tomfrx12/TTF" target="_blank" className="group">
                            <FaGithub className="w-6 h-6 text-(--color-white-break)/80 transition-all duration-300 group-hover:text-(--color-secondary) group-hover:scale-110"/>
                        </Link>
                    </div>
                    <Text name="p" className="text-slate-400 text-xs mt-1">© 2026 TTF</Text>
                    <Text name="p" className="text-slate-400 text-xs mt-1">Travail pédagogique sans objectifs commerciaux</Text>
                    
                </div>
                <Link href="/charte-editoriale" className="text-(--color-white-break)/90 text-sm font-medium transition-all duration-300 hover:text-(--color-secondary) hover:scale-105">Charte Éditoriale</Link>
            </div>
        </footer>
    );
}