"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CardTuto from "@/components/CardTuto";
import Text from "@/components/Text";

type Tuto = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

const DEMO_TUTOS: Tuto[] = [
  { id: "react-intro", title: "Introduction à React.js", description: "Apprenez les bases de React.js.", category: "React", createdAt: "2026-06-08" },
  { id: "figma-101", title: "Premiers pas avec Figma", description: "Apprenez les bases de l'outil de design.", category: "Figma", createdAt: "2026-05-20" },
  { id: "seo-basics", title: "Optimiser le SEO de votre site", description: "Guide pratique pour améliorer la visibilité.", category: "SEO", createdAt: "2026-04-12" },
  { id: "node-api", title: "Créer une API avec Node.js", description: "Tutoriel rapide pour démarrer une API.", category: "Node", createdAt: "2026-06-01" },
  { id: "react-hooks", title: "Comprendre les Hooks React", description: "useState, useEffect, useRef expliqués.", category: "React", createdAt: "2026-06-09" },
];

export default function Tutos() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"none" | "recent" | "oldest">("recent");

  const categories = useMemo(() => {
    const set = new Set(DEMO_TUTOS.map((t) => t.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let list = DEMO_TUTOS.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = q === "" || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      const matchesCategory = category === "all" || t.category === category;
      return matchesQuery && matchesCategory;
    });

    if (sort === "recent") {
      list = list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    } else if (sort === "oldest") {
      list = list.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    }

    return list;
  }, [query, category, sort]);

  return (
    <main className="min-h-[95vh] max-w-360 flex flex-col justify-self-center px-4">
      <section className="mb-6">
        <Text name="h1" className="uppercase">Tuto à la Une :</Text>
        <div className="flex flex-col md:flex-row bg-(--color-white-break) rounded-xl border border-slate-200 overflow-hidden p-6 gap-6 items-center shadow-sm">
          <div className="w-full md:w-2/5 bg-[#f5ebe6] rounded-lg aspect-16/10 flex items-center justify-center p-4">
            <span className="text-sm text-slate-400 font-medium">[ Illustration React ]</span>
          </div>
          <div className="flex flex-col flex-1">
            <Text name="h2">Introduction à React.js</Text>
            <Text name="p">Apprenez les bases de React.js pour construire des interfaces utilisateur dynamiques.</Text>
            <Link href="/tutoriels/react-intro">
              <button className="bg-(--color-primary) hover:bg-(--color-secondary) text-(--color-white-break) font-medium mt-4 px-5 py-2.5 rounded-lg transition-colors self-start text-sm">
                Commencer Formation
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative min-w-45">
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="w-full appearance-none bg-(--color-white-break) border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none focus:border-blue-500">
            <option value="none">{`Date d'ajout`}</option>
            <option value="recent">Récemment ajoutés</option>
            <option value="oldest">Les plus anciens</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
        </div>

        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Recherche de tutos..."
            className="w-full bg-(--color-white-break border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" /></svg>
          </div>
        </div>

        <div className="relative min-w-45">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none bg-(--color-white-break) border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none focus:border-blue-500">
            {categories.map((c) => (
              <option key={c} value={c}>{c === "all" ? "Toutes les catégories" : c}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
          </div>
        </div>
      </section>

      <section className="py-4">
        <Text name="h2" className="text-2xl font-bold mb-4 text-slate-800">Tutoriels</Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div>Aucun tutoriel trouvé.</div>
          ) : (
            filtered.map((t) => (
              <Link key={t.id} href={`/tutoriels/${t.id}`}>
                <CardTuto name={t.category} title={t.title} description={t.description} />
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}