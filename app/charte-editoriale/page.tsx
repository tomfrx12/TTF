import Link from "next/link";

export default function CharteEditorialePage() {
  return (
    <main className="min-h-screen bg-[var(--color-white-break)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors duration-300 inline-flex items-center gap-1 mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Retour à l&apos;accueil
        </Link>

        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight py-4 sm:text-4xl">
          Charte Éditoriale
        </h1>
        <p className="text-sm text-gray-400 mb-10">TTF / Tutos Tom Fourneaux</p>

        <div className="space-y-10 text-gray-600 text-sm sm:text-base leading-relaxed">

          {/* 1 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full shrink-0"></span>
              1. Présentation du projet
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Domaine d&apos;activité et expertise :</span>{" "}
                TTF est une plateforme web qui centralise et catégorise des tutoriels de développement web (HTML/CSS, JavaScript, frameworks, outils de maquettage) produits durant le premier semestre. Le parti pris : rendre accessible une masse de ressources techniques dispersées, en misant sur le micro-learning et la simplification visuelle des blocs de code les plus complexes.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Histoire et évolution :</span>{" "}
                Conçu en S2 de l&apos;Année 2, TTF est né d&apos;un constat simple : les tutoriels du premier semestre étaient éparpillés et non interactifs. Le projet les a structurés et indexés dans un environnement web moderne, pensé pour les habitudes de consommation de la génération Z.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Mission :</span>{" "}
                Fournir des capsules de savoir technique courtes et gratuites, pour débloquer rapidement un problème de code ou prendre en main une fonctionnalité de programmation.
              </p>
            </div>
          </section>

          {/* 2 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full shrink-0"></span>
              2. Vision, Valeurs fondamentales et Ciblage Stratégique
            </h2>
            <div className="space-y-3">
              <p className="font-semibold text-[var(--color-secondary)]">Valeurs de la marque :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><span className="font-medium text-gray-700">Code :</span> rigueur absolue sur la propreté et la mise à jour du code présenté.</li>
                <li><span className="font-medium text-gray-700">Accessibilité :</span> gratuité totale et interface épurée, pour que les compétences web soient accessibles à tous les étudiants.</li>
                <li><span className="font-medium text-gray-700">Entraide :</span> un ton de développeur à développeur, pas de cours magistral.</li>
                <li><span className="font-medium text-gray-700">Clarté :</span> pas de textes à rallonge, pas de publicités. La ligne de code utile passe en premier.</li>
              </ul>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Vision :</span>{" "}
                Devenir la plateforme de référence pour les étudiants qui veulent apprendre à coder, en alliant logique de programmation et interface (UI/UX) soignée.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Cible prioritaire :</span>{" "}
                Étudiants de 18 à 25 ans, habitués à trouver des solutions rapides et visuelles, qui fuient les documentations austères.
              </p>

              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm">
                <p className="font-semibold text-[var(--color-secondary)] mb-3">Persona</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <p className="font-medium text-gray-700">Rougeaux Thomas, 24 ans</p>
                    <p className="text-gray-500">Étudiant en début de cursus — Homme</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Personnalité</p>
                    <p className="text-gray-500">Autodidacte, curieux mais impatient, cherche des solutions directes.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Frustrations</p>
                    <p className="text-gray-500">Tutoriels vidéos trop longs, sites surchargés de pubs, impossible de sauvegarder sa progression.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Objectifs</p>
                    <p className="text-gray-500">Apprendre de façon autonome, enrichir son CV, réaliser ses propres projets web.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full shrink-0"></span>
              3. Objectifs stratégiques des contenus
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Note de cadrage :</span>{" "}
                Toutes les productions de TTF (texte comme visuel) doivent servir la croissance de la plateforme tout en répondant aux attentes d&apos;immédiateté de la communauté.
              </p>
              <p className="font-semibold text-[var(--color-secondary)]">Objectifs principaux :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Installer le réflexe &quot;Tutos Tom Fourneaux&quot; chez les étudiants de 18-25 ans dès qu&apos;ils font face à un bug ou un besoin de développement.</li>
                <li>Casser l&apos;image de la programmation &quot;froide&quot; ou illisible en produisant des contenus esthétiques : interfaces soignées, animations de code fluides.</li>
                <li>Générer de l&apos;engagement ciblé : sauvegardes de posts, partages de hacks techniques.</li>
                <li>Convertir l&apos;audience sociale en utilisateurs inscrits sur le site, pour qu&apos;ils tracent leur progression via l&apos;historique de tutoriels complétés.</li>
              </ul>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Exigence produit :</span>{" "}
                Chaque contenu doit être immédiatement actionnable, visuellement accrocheur et centré sur ce que l&apos;utilisateur en retire concrètement.
              </p>
            </div>
          </section>

          {/* 4 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full shrink-0"></span>
              4. Stratégie SEO
            </h2>
            <div className="space-y-3">
              <p className="font-semibold text-[var(--color-secondary)]">Mots-clés cibles (Intention de recherche &quot;Bug &amp; Raccourci&quot;) :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><span className="font-medium text-gray-700">Mots-clés principaux :</span> « tuto dev web gratuit », « apprendre HTML CSS », « corriger bug javascript ».</li>
                <li><span className="font-medium text-gray-700">Longue traîne :</span> « display grid ne fonctionne pas », « centrer une div proprement », « raccourcis clavier VS Code indispensables ».</li>
              </ul>
              <p className="font-semibold text-[var(--color-secondary)]">Optimisation Technique des Contenus :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><span className="font-medium text-gray-700">Sémantique :</span> Chaque tutoriel intègre le code source en texte brut (avec les balises HTML <code className="bg-gray-100 px-1 rounded text-xs">&lt;code&gt;</code>) pour être indexé et lu directement par les robots de Google.</li>
                <li><span className="font-medium text-gray-700">Balises HTML logiques :</span> Utilisation stricte d&apos;un seul titre <code className="bg-gray-100 px-1 rounded text-xs">&lt;h1&gt;</code> par page (le nom du tuto), de sous-titres <code className="bg-gray-100 px-1 rounded text-xs">&lt;h2&gt;</code> pour les étapes, et de la balise <code className="bg-gray-100 px-1 rounded text-xs">&lt;strong&gt;</code> pour les mots-clés en gras.</li>
              </ul>
            </div>
          </section>

          {/* 5 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full shrink-0"></span>
              5. Choix et Justification du Réseau Social
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Réseau sélectionné :</span>{" "}
                TikTok, avec déclinaison organique en Instagram Reels.
              </p>
              <p className="font-semibold text-[var(--color-secondary)]">Pourquoi TikTok :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>La tranche 18-25 ans utilise TikTok comme moteur de recherche pour des astuces concrètes et des micro-tutos de programmation. C&apos;est un comportement documenté, pas une hypothèse.</li>
                <li>Le format vertical 9:16 impose une concision qui colle bien à l&apos;ADN TTF : résoudre un bug ou expliquer une fonction en moins de 60 secondes.</li>
                <li>La vidéo sert d&apos;appât visuel. La frustration du format court pousse naturellement le spectateur vers le lien en bio, qui renvoie vers la fiche textuelle complète sur le site, où l&apos;utilisateur peut copier le code source et enregistrer sa progression.</li>
              </ul>
            </div>
          </section>

          {/* 6 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full shrink-0"></span>
              6. Ligne Éditoriale, Ton et Identité Linguistique
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Le ton TTF :</span>{" "}
                Pédagogique, direct et complice. TTF parle avec l&apos;autorité d&apos;un dev expérimenté, mais avec l&apos;accessibilité d&apos;un camarade de promo. Le jargon théorique sans application concrète est banni.
              </p>
              <p className="font-semibold text-[var(--color-secondary)]">Règles d&apos;expression :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><span className="font-medium text-gray-700">Tutoiement obligatoire</span> sur le site et les réseaux, pour supprimer la distance institutionnelle.</li>
                <li><span className="font-medium text-gray-700">Voix active et impératif d&apos;action :</span> les tournures passives sont proscrites. On préfère &quot;Copie ce morceau de code&quot;, &quot;Injecte cette propriété&quot;, &quot;Déploie ton site en un clic&quot;.</li>
                <li><span className="font-medium text-gray-700">Concision :</span> une phrase = une idée technique. Les paragraphes sur le site web ne dépassent pas 3 à 4 lignes pour éviter la surcharge visuelle.</li>
              </ul>
            </div>
          </section>

          {/* 7 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full shrink-0"></span>
              7. Règles de Formatage Textuel Visuel
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Ratio visuel / texte :</span>{" "}
                Le visuel montre le résultat ou l&apos;action, le texte valide la méthode. Pas de proportion stricte, mais les deux doivent coexister.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Gras :</span>{" "}
                Obligatoire pour les mots-clés de code, les propriétés exactes, les balises et les outils incontournables.
              </p>
              <p>
                <span className="font-semibold text-[var(--color-secondary)]">Couleur d&apos;accentuation (Rose Magenta) :</span>{" "}
                Réservée aux lignes de code critiques, aux balises essentielles et aux textes incrustés en vidéo (overlays) pour guider le regard.
              </p>
            </div>
          </section>

          {/* 8 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-secondary)] rounded-full shrink-0"></span>
              8. Indicateurs de Performance et Suivi des Contenus
            </h2>
            <div className="space-y-3">
              <p className="font-semibold text-[var(--color-secondary)]">Notoriété et visibilité (TikTok) :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Nombre de vues uniques par vidéo, pour mesurer la portée organique de la marque.</li>
                <li>Taux de croissance des abonnés.</li>
              </ul>
              <p className="font-semibold text-[var(--color-secondary)]">Engagement (TikTok) :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><span className="font-medium text-gray-700">Taux de mise en favoris / sauvegarde :</span> c&apos;est le KPI central. Il indique que l&apos;étudiant considère la vidéo comme une ressource à garder pour ses projets.</li>
                <li>Nombre de partages, pour mesurer la recommandation organique entre étudiants.</li>
              </ul>
              <p className="font-semibold text-[var(--color-secondary)]">Conversion (passerelle web TTF) :</p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>Taux de clic sur le lien en bio (CTR vers la page publique du site).</li>
                <li>Nouvelles inscriptions suite aux publications.</li>
                <li>Taux de complétion des tutoriels, suivi via l&apos;historique utilisateur connecté.</li>
              </ul>
            </div>
          </section>

          {/* 9 */}
          <section className="p-1">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[var(--color-primary)] rounded-full shrink-0"></span>
              9. Calendrier Éditorial TikTok (15 juin – 18 juillet 2026)
            </h2>

            {[
              {
                semaine: "Semaine 1",
                theme: "CSS",
                periode: "15 – 20 juin",
                posts: [
                  { jour: "Lun", date: "15/06", heure: "12h30", format: "Vidéo courte", description: "POV : Tu triches encore avec 5 lignes de « margin » au lieu d'écrire une seule fois « gap: 20px; ». Nettoie ton code !", hashtags: "#AstuceCode #Frontend #Css #TTF" },
                  { jour: "Mar", date: "16/06", heure: "17h00", format: "Vidéo longue", description: "Pourquoi la documentation officielle te fait perdre un temps précieux. 3 erreurs de layout mobile récurrentes et comment les fixer en 3 lignes.", hashtags: "#MicroLearning #ApprendreLeCode #FrontEnd #TTF" },
                  { jour: "Mer", date: "17/06", heure: "11h00", format: "Carrousel", description: "L'anatomie de la propriété « box-sizing: border-box ». Comprendre graphiquement comment le padding déforme ton design si tu ne l'actives pas. Sauvegarde pour ton TP !", hashtags: "#WebDesign #UIUX #Css #TTF" },
                  { jour: "Jeu", date: "18/06", heure: "17h00", format: "Vidéo ASMR", description: "Session chill : On intègre un effet « verre dépoli » ultra moderne en CSS pur pour ton portfolio. Monte le son et kiffe le bruit du clavier.", hashtags: "#ASMRCoding #Esthetique #Css #TTF" },
                  { jour: "Ven", date: "19/06", heure: "12h30", format: "Vidéo courte", description: "Rituel code propre du vendredi : un petit « git status » et nettoyage des classes CSS inutilisées avant de partir en week-end !", hashtags: "#CleanCode #GitHub #Css #TTF" },
                  { jour: "Sam", date: "20/06", heure: "10h00", format: "Carrousel", description: "Ta palette UI du week-end pour tes projets de fin d'année. L'harmonie parfaite entre un fond sombre abyssal (#0D1117) et des accents Rose Magenta fluo.", hashtags: "#Color #WebDesign #Css #TTF" },
                ],
              },
              {
                semaine: "Semaine 2",
                theme: "JavaScript",
                periode: "22 – 27 juin",
                posts: [
                  { jour: "Lun", date: "22/06", heure: "12h30", format: "Vidéo esthétique", description: "Comment animer proprement un bouton au clic en JavaScript pur. Zoom macro sur un code fluide pour rendre tes maquettes interactives.", hashtags: "#JavaScript #Frontend #Esthetique #TTF" },
                  { jour: "Mar", date: "23/06", heure: "17h00", format: "Vidéo longue", description: "Comprendre l'asynchronisme en JavaScript sans attraper de migraine. Du cauchemar des promesses imbriquées jusqu'à la clarté absolue du couple « async / await ».", hashtags: "#JavaScript #ApprendreLeCode #TTF" },
                  { jour: "Mer", date: "24/06", heure: "11h00", format: "Vidéo courte", description: "Le bug le plus traître du JavaScript : « == » vs « === ». L'un compare la valeur, l'autre vérifie aussi le type. Utilise toujours le triple égal !", hashtags: "#JavaScript #AstuceCode #TTF" },
                  { jour: "Jeu", date: "25/06", heure: "17h00", format: "Carrousel", description: "Marre de l'erreur « Cannot read properties of undefined » ? Découvre le super pouvoir de l'enchaînement facultatif « ?. » en JavaScript.", hashtags: "#Debugging #JavaScript #AstuceCode #TTF" },
                  { jour: "Ven", date: "26/06", heure: "12h30", format: "Vidéo courte", description: "Si ton script JavaScript ne trouve pas tes éléments HTML au chargement, vérifie juste si t'as bien écrit l'attribut « defer » dans ta balise script.", hashtags: "#Debugging #HTML5 #AstuceCode #TTF" },
                  { jour: "Sam", date: "27/06", heure: "10h00", format: "Vidéo longue", description: "Mon parcours secret pour devenir autonome en intégration front-end sans dépendre du copier-coller de templates sombres. Découpe tes problèmes logiques par étapes.", hashtags: "#EspritCode #Autodidacte #DevConseil #TTF" },
                ],
              },
              {
                semaine: "Semaine 3",
                theme: "React / Tailwind",
                periode: "29 juin – 4 juillet",
                posts: [
                  { jour: "Lun", date: "29/06", heure: "12h30", format: "Vidéo longue", description: "Pourquoi écrire du CSS à la main en 2026 te fait perdre un temps fou. Découvre Tailwind CSS : tu styles tes composants directement dans ton HTML.", hashtags: "#TailwindCss #DevWeb #AstuceCode #Frontend #TTF" },
                  { jour: "Mar", date: "30/06", heure: "17h00", format: "Vidéo courte", description: "La magie des composants React. Arrête de dupliquer ton code HTML. Tu crées ton bouton une fois, tu le réutilises partout en changeant juste ses props.", hashtags: "#ReactJS #Frontend #CleanCode #TTF" },
                  { jour: "Mer", date: "01/07", heure: "11h00", format: "Carrousel", description: "Comprendre le hook « useState » en React d'un seul coup d'œil. Comment stocker et mettre à jour les données de ton site en temps réel sans recharger la page.", hashtags: "#ReactTips #Hooks #DevWeb #FicheMemo #TTF" },
                  { jour: "Jeu", date: "02/07", heure: "17h00", format: "Vidéo esthétique", description: "Le guide ultime pour faire un site 100% Mobile-First avec Tailwind. Plus besoin de Media Queries complexes, utilise juste les préfixes « md: » et « lg: ».", hashtags: "#Responsive #TailwindCss #AstuceCode #MobileFirst #Frontend #TTF" },
                  { jour: "Ven", date: "03/07", heure: "12h30", format: "Carrousel", description: "POV : Tu viens de lancer une boucle infinie de requêtes API sur ton application React. N'oublie jamais les crochets « [] » à la fin de ton « useEffect » !", hashtags: "#ReactJS #Hooks #TTF" },
                  { jour: "Sam", date: "04/07", heure: "10h00", format: "Vidéo courte", description: "Comment organiser tes dossiers « /composants » et « /hooks » sur React pour impressionner les recruteurs lors de tes entretiens.", hashtags: "#CleanArchitecture #ReactJS #GitHub #AstuceCode #TTF" },
                ],
              },
              {
                semaine: "Semaine 4",
                theme: "PHP / SQL",
                periode: "6 – 11 juillet",
                posts: [
                  { jour: "Lun", date: "06/07", heure: "12h30", format: "Vidéo longue", description: "Comment lier ton interface à un vrai serveur. Découvre comment PHP récupère les données de tes utilisateurs avec « $_POST » en toute sécurité.", hashtags: "#Backend #PHP #TTF" },
                  { jour: "Mar", date: "07/07", heure: "17h00", format: "Vidéo courte", description: "La commande SQL magique pour trier tes utilisateurs : « SELECT * FROM users ORDER BY created_at DESC; » pour afficher les derniers inscrits en premier.", hashtags: "#SQL #Database #Backend #TTF" },
                  { jour: "Mer", date: "08/07", heure: "11h00", format: "Carrousel", description: "Comprendre les jointures SQL (INNER JOIN) sans explosion de cerveau. Comment lier ta table « Utilisateurs » à ta table « Commandes » de manière logique.", hashtags: "#SQL #Database #FicheMemo #ApprendreLeCode #TTF" },
                  { jour: "Jeu", date: "09/07", heure: "17h00", format: "Vidéo esthétique", description: "La sécurité d'abord : protège ton code PHP contre les injections SQL. Utilise toujours les requêtes préparées avec PDO pour bloquer les « hackers du dimanche ».", hashtags: "#SQL #PHP #AstuceCode #Backend #Debugging #TTF" },
                  { jour: "Ven", date: "10/07", heure: "12h30", format: "Vidéo courte", description: "L'astuce de débogage ultime en PHP : abuse du « var_dump(); die(); » pour analyser tes objets et tes tableaux quand ton code refuse de s'afficher.", hashtags: "#PHP #AstuceCode #Debugging #Backend #TTF" },
                  { jour: "Sam", date: "11/07", heure: "10h00", format: "Carrousel", description: "Tu as fini HTML/CSS/JavaScript et attaqué PHP/SQL ? Voici comment packager ces compétences sur ton Github pour décrocher ton premier contrat.", hashtags: "#GitHub #DevWeb #TTF" },
                ],
              },
              {
                semaine: "Semaine 5",
                theme: "Fullstack",
                periode: "13 – 18 juillet",
                posts: [
                  { jour: "Lun", date: "13/07", heure: "12h30", format: "Vidéo longue", description: "Le guide ultime pour connecter ton Front React à ton Back PHP. Utilise « fetch() » ou Axios pour envoyer tes requêtes et récupérer tes données SQL au format JSON.", hashtags: "#Fullstack #ReactJS #PHP #DevWeb #TTF" },
                  { jour: "Mar", date: "14/07", heure: "17h00", format: "Carrousel", description: "Ne laisse pas les utilisateurs hacker ton site. Découvre comment la fonction PHP « htmlspecialchars() » nettoie les inputs et bloque les injections de scripts malveillants.", hashtags: "#PHP #Backend #AstuceCode #TTF" },
                  { jour: "Mer", date: "15/07", heure: "11h00", format: "Vidéo courte", description: "POV : Tu écris encore 4 requêtes différentes au lieu d'utiliser un « LEFT JOIN » pour récupérer les données de deux tables SQL d'un seul coup.", hashtags: "#SQL #Database #AstuceCode #TTF" },
                  { jour: "Jeu", date: "16/07", heure: "17h00", format: "Vidéo esthétique", description: "Session chill : On met notre application en ligne. Regarde le build se compiler proprement sur le VPS et la base de données se synchroniser.", hashtags: "#ASMRCoding #VPS #MiseEnProd #TTF" },
                  { jour: "Ven", date: "17/07", heure: "12h30", format: "Vidéo courte", description: "Aide-mémoire express : Comprendre les codes d'erreur HTTP. 404 = Fichier introuvable, 500 = Ton script PHP a crashé, 200 = Tout fonctionne. Ne panique plus !", hashtags: "#Debugging #AstuceCode #HTTPRequest #TTF" },
                  { jour: "Sam", date: "18/07", heure: "10h00", format: "Carrousel", description: "La checklist ultime pour concevoir ton premier projet Fullstack ce week-end. De la maquette à la base de données SQL jusqu'au déploiement final pour ton portfolio.", hashtags: "#Fullstack #Portfolio #DevWeb #TTF" },
                ],
              },
            ].map(({ semaine, theme, periode, posts }) => (
              <div key={semaine} className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{semaine}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--color-primary)] text-white font-semibold">{theme}</span>
                  <span className="text-xs text-gray-400">{periode}</span>
                </div>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                  {posts.map((p) => (
                    <div key={p.date} className="flex gap-3 p-3 bg-white hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                      <div className="shrink-0 w-16 text-center">
                        <p className="font-bold text-gray-700">{p.jour}</p>
                        <p className="text-gray-400">{p.date}</p>
                        <p className="text-gray-400">{p.heure}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 ${
                          p.format.includes("longue")
                            ? "bg-[var(--color-secondary)]/15 text-[var(--color-secondary)]"
                            : p.format.includes("Carrousel")
                            ? "bg-indigo-100 text-indigo-600"
                            : p.format.includes("ASMR") || p.format.includes("esthétique")
                            ? "bg-teal-100 text-teal-700"
                            : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        }`}>
                          {p.format}
                        </span>
                        <p className="text-gray-700 leading-snug">{p.description}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{p.hashtags}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

        </div>
      </div>
    </main>
  );
}
