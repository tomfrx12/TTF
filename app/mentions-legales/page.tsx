import Link from "next/link";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[var(--color-white-break)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link 
          href="/" 
          className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-300 inline-flex items-center gap-1 mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight py-4 sm:text-4xl">
          Mentions Légales
        </h1>

        <div className="space-y-8 text-gray-600 text-sm sm:text-base leading-relaxed">
          
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full"></span>
              1. Édition du site
            </h2>
            <p>
              Le site internet <span className="font-semibold text-gray-800">TTF</span> est édité par :
            </p>
            <ul className="mt-2 space-y-1.5 pl-1 text-gray-600list-disc list-inside">
              <li>
                <span className="font-medium text-gray-700">Directeur de la publication :</span> Tom Fourneaux
              </li>
              <li>
                <span className="font-medium text-gray-700">Contact Email :</span> tfourneaux@normandiewebschool.fr
              </li>
              <li>
                <span className="font-medium text-gray-700">Statut :</span> Étudiant à la Normandie Web School
              </li>
            </ul>
          </section>

          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full"></span>
              2. Hébergement
            </h2>
            <p>
              Le site internet est hébergé dans le cadre d'un projet étudiant :
            </p>
            <ul className="mt-2 space-y-1.5 pl-1 text-gray-600 list-disc list-inside">
              <li>
                <span className="font-medium text-gray-700">Hébergeur :</span> Tom Fourneaux (Auto-hébergement)
              </li>
              <li>
                <span className="font-medium text-gray-700">Infrastructure :</span> Hébergé localement par l'éditeur à mon adresse personnelle.
              </li>
              <li>
                <span className="font-medium text-gray-700">Réseau :</span> Propulsé via le réseau de mon fournisseur d'accès internet.
              </li>
            </ul>
          </section>

          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full"></span>
              3. Propriété intellectuelle
            </h2>
            <p>
              Tout le contenu présent sur ce site (textes, designs, codes sources, logos, maquettes graphiques) est la propriété exclusive de <span className="font-semibold text-gray-800">TTF</span>, sauf mention contraire explicite.
            </p>
            <p className="mt-3">
              Toute reproduction, modification ou adaptation, totale ou partielle de ces éléments est strictement interdite sans une autorisation écrite préalable de l'auteur, conformément aux dispositions du Code de la propriété intellectuelle.
            </p>
          </section>

          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full"></span>
              4. Données personnelles et Confidentialité
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), la sécurité de tes données est une priorité :
            </p>
            <ul className="mt-2 space-y-3 pl-1 text-gray-600">
              <li className="list-disc list-inside">
                <span className="font-semibold text-gray-700">Collecte :</span> Les informations demandées lors de l'authentification (Nom, Prénom, Email) servent exclusivement à la gestion technique et sécurisée de ton espace membre étudiant.
              </li>
              <li className="list-disc list-inside">
                <span className="font-semibold text-gray-700">Partage :</span> Aucune donnée personnelle n'est vendue, partagée, louée ou cédée à des entités tierces.
              </li>
              <li className="list-disc list-inside">
                <span className="font-semibold text-gray-700">Vos Droits :</span> Vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression définitive de vos données sur simple demande par email à l'adresse spécifiée à la section 1.
              </li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  );
}