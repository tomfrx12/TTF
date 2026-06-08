// import CardTuto from "@/components/CardTuto";

import CardTuto from "@/components/CardTuto";
import Text from "@/components/Text";

export default function Tutos() {
    return ( 
        <main className="min-h-[95vh] max-w-360 flex flex-col justify-self-center px-4">
          <section className="mb-8">
            <Text name="h1" className="uppercase">Tuto à la Une :</Text>
        {/* avec l'aide la bd ( que je ne sais pas comment je vais m'y prendre ) il faudrait faire un .map mais seulement le plus ressens ( donc un timestamp dans la bd déjà ) */}
            <div className="flex flex-col md:flex-row bg-(--color-white-break) rounded-xl border border-slate-200 overflow-hidden p-6 gap-6 items-center shadow-sm">
              <div className="w-full md:w-2/5 bg-[#f5ebe6] rounded-lg aspect-16/10 flex items-center justify-center p-4">
                {/* name avec la bd ( illustration jsp si j'en fais ) */}
                <span className="text-sm text-slate-400 font-medium">[ Illustration React ]</span>
              </div>
              <div className="flex flex-col flex-1">
                    {/* name avec la bd */}
                <Text name="h2">Introduction à React.js</Text>
                <Text name="p">
                        {/* text avec la bd */}
                  Apprenez les bases de React.js pour construire des interfaces utilisateur dynamiques.
                </Text>
                <button className="bg-(--color-primary) hover:bg-(--color-secondary) text-(--color-white-break) font-medium mt-4 px-5 py-2.5 rounded-lg transition-colors self-start text-sm">
                  Commencer Formation
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative min-w-45">
              <select className="w-full appearance-none bg-(--color-white-break) border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none focus:border-blue-500">
                <option>Récemment ajoutés</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>

            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="Recherche de tutos..." 
                className="w-full bg-(--color-white-break border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.603 10.601z" /></svg>
              </div>
            </div>

            <div className="relative min-w-45">
              <select className="w-full appearance-none bg-(--color-white-break) border border-slate-200 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 font-medium cursor-pointer focus:outline-none focus:border-blue-500">
                <option>Toutes les catégories</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
              </div>
            </div>
          </section>

          <section>
            <Text name="h2" className="text-2xl font-bold mb-4 text-slate-800">Tutoriels</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* faire .map sur la bd pour tout les projets */}
              <CardTuto name="Figma" title="Premiers pas avec Figma" description="Apprenez les bases de loutil de design."/>
              <CardTuto name="SEO" title="Optimiser le SEO de votre site" description="Guide pratique pour améliorer la visibilité."/>
            </div>
          </section>
        </main>
    )
};