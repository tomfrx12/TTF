import { useState } from "react";

import { X } from 'lucide-react';

export default function ReactTuto() {
    var [isOpen, setIsOpen] = useState(true);
    var [isPartie, setIsPartie] = useState(1);

    return (
        <div className="flex">
            <div id="menu" className={`${ isOpen ? "w-lg" : "w-0"} transition-all duration-200`}> 
                <div className={`bg-white min-h-screen overflow-y-scroll ${ isOpen ? "w-lg" : "hidden"}`}>
                    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-500 w-full h-20 top-0 sticky">
                        <p className='font-bold'>Tables des parties</p>
                        <X className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
                    </div>
                    <ul className="px-2">
                        <li className="p-3" onClick={() => setIsPartie(1)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 1</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">S'initier a React.js</p>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(2)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 2</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Du HTML / JS classique a React.js</p>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(3)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 3</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Apprendre à utiliser useState, useEffect et useRef</p>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(4)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 4</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Comprendre le Routing avec React Router Dom !</p>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(5)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 5</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Mettre en pratiques les notions vu précédemment</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex-1 mx-auto max-w-200">
                <div className={`px-8 py-4 ${ isPartie == 1 ? "" : "hidden"}`}>
                    <h1>Partie 1</h1>
                    <video controls>
                        <source src="/vid/partie2/Tuto 2 screencast.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 2 ? "" : "hidden"}`}>
                    <h1>Partie 2</h1>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 3 ? "" : "hidden"}`}>
                    <h1>Partie 3 : Donnez vie à vos composants avec les Hooks</h1>
                    <p>Précédemment : Dans la partie 2, nous avons vu la philosophie de React à travers l'animation. Vous avez compris que React met à jour le DOM intelligemment. Objectif de cette partie : Apprendre à gérer la logique, les données et les événements.</p>
                    <h2>Introduction</h2>
                    <p>Bravo d'être arrivé jusqu'ici !</p>
                    <p>Jusqu'à présent, nos composants étaient de simples "coquilles vides" : ils affichaient du HTML, mais ils ne faisaient pas grand-chose. Ils étaient statiques. Or, une application moderne, ça bouge : on clique, on remplit des formulaires, des compteurs s'incrémentent, des données se chargent...</p>
                    <p>Pour faire tout cela, React utilise un concept fondamental : <strong>les Hooks.</strong></p>
                    <p>Ce sont des fonctions spéciales qui permettent de "se brancher" (to hook up) aux fonctionnalités de React. Nous allons voir les trois plus importants, ceux que vous utiliserez 90% du temps :</p>
                    <ul>
                        <li>1. useState (L'état)</li>
                        <li>2. useEffect (L'effet)</li>
                        <li>3. useRef (La référence)</li>
                    </ul>
                    <h3>1. useState : La mémoire du composant</h3>
                    <p>Rappelez-vous : un composant est une fonction. En JavaScript classique, quand une fonction se termine, toutes ses variables disparaissent.</p>
                    <p>Mais en React, nous avons besoin que notre composant se souvienne de certaines choses (est-ce que le menu est ouvert ? combien d'articles sont dans le panier ?). C'est le rôle de useState.</p>
                    <p><strong>La mécanique</strong></p>
                    <img src="/img/screenshot/react/partie3/setstate.png" alt="" />
                    <p>Pour l'utiliser, on "déstructure" le tableau qu'il nous renvoie :</p>
                    <img src="/img/screenshot/react/partie3/code_setstate.png" alt="" />
                    <p><strong>Exercice</strong> : Le Compteur</p>
                    <p>C'est l'exemple le plus classique, mais c'est le meilleur pour comprendre.</p>
                    <img src="/img/screenshot/react/partie3/exercice_compteur.png" alt="" />
                    <p><strong>Le concept clé :</strong>À chaque fois que vous appelez setCompteur, React comprend que la donnée a changé. Il relance alors la fonction de votre composant pour mettre à jour l'affichage. C'est le "Re-render".</p>
                    <h3>2. useEffect : Gérer les effets de bord</h3>
                    <p>Maintenant que notre composant a une mémoire, il doit parfois interagir avec le monde extérieur (le navigateur, une API, un timer). On appelle ça des "effets de bord".</p>
                    <p>Le problème : si on met ce code directement dans le composant, il s'exécutera à chaque fois que le composant s'affiche (ce qui peut arriver des centaines de fois !). On utilise useEffect pour contrôler quand ces actions se produisent.</p>
                    <p><strong>Le tableau de dépendances</strong></p>
                    <p>C'est le pilote de votre effet. Il se trouve en deuxième argument du hook.</p>
                    <img src="/img/screenshot/react/partie3/useeffect.webp" alt="" />
                    <p>Prenons un exemple concret : nous voulons changer le titre de l'onglet du navigateur à chaque fois que notre compteur change.</p>
                    <img src="/img/screenshot/react/partie3/code_useeffect.png" alt="" />
                    <p><strong>Astuce de pro :</strong>Si vous voulez charger des données depuis une API au chargement de la page, utilisez un tableau vide []. Cela garantit que la requête ne partira qu'une seule fois !</p>
                    <h3>3. useRef : Accéder au DOM directement</h3>
                    <p>Parfois, useState est trop "lourd". Si vous voulez juste cibler un champ de texte pour mettre le curseur dedans, vous n'avez pas besoin de relancer tout le composant.</p>
                    <p>useRef permet de créer une référence vers un élément HTML réel. C'est comme mettre un post-it sur une balise pour la retrouver plus tard.</p>
                    <p><strong>Exemple : Le Focus automatique</strong></p>
                    <img src="/img/screenshot/react/partie3/liaison_useref.png" alt="" />
                    <img src="/img/screenshot/react/partie3/code_useref.png" alt="" />
                    <h4>Résumé du chapitre</h4>
                    <p>Pour bien choisir votre outil, retenez ces trois règles d'or :</p>
                    <p>Premièrement, utilisez useState dès que l'information doit être visible à l'écran. Si la donnée change (un score, un formulaire, une couleur), et que l'interface doit changer aussi, c'est un State. C'est le seul qui déclenche une mise à jour visuelle.</p>
                    <p>Deuxièmement, utilisez useEffect pour synchroniser votre composant avec l'extérieur. Si vous devez lancer un timer, appeler une base de données ou modifier le titre de la page, c'est ici que ça se passe. N'oubliez jamais le tableau de dépendances pour éviter les boucles infinies !</p>
                    <p>Enfin, gardez useRef sous le coude pour les cas techniques. Si vous devez manipuler une balise HTML précise (comme un input ou une vidéo) ou stocker une valeur "secrète" qui ne doit pas provoquer de rafraîchissement de la page, c'est l'outil idéal.</p>
                    <p><strong>Et la suite ?</strong></p>
                    <p>Maintenant que vous savez gérer la logique d'un composant isolé, nous allons voir comment <strong>naviguer</strong> entre ces composants.</p>
                    <p>Dans la <strong>Partie 4</strong>, nous allons installer <strong>React Router</strong> pour transformer nos simples composants en véritables pages connectées (Accueil, À propos, Contact...).</p>
                    <p><strong>Rendez-vous au chapitre suivant : Comprendre le Routing !</strong></p>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 4 ? "" : "hidden"}`}>
                    <h1>Partie 4 : Naviguer entre les pages avec React Router</h1>
                    <p>Précédemment : Dans la partie 3, vous avez appris à gérer l'état et les effets de vos composants avec les Hooks. <strong>Objectif de cette partie :</strong>Créer une véritable architecture de site web avec plusieurs pages, sans jamais recharger le navigateur.</p>
                    <h2>Introduction</h2>
                    <p>Jusqu'à maintenant, votre application React s'affichait sur une seule "page". Si vous vouliez voir un autre composant, vous deviez modifier le code manuellement pour l'afficher à la place de l'autre.</p>
                    <p>Dans la vraie vie, un site a des URLs : <code>/accueil, /contact, /produit/12.</code></p>
                    <p>Mais attention ! React fonctionne comme une <strong>SPA (Single Page Application)</strong>. Contrairement à un site classique qui demande une nouvelle page au serveur à chaque clic, une SPA <strong>simule</strong> la navigation. Elle reste sur la même page HTML, mais change le contenu JavaScript à l'intérieur.</p>
                    <p>our faire cela, nous avons besoin d'un chef d'orchestre : <strong>React Router</strong>.</p>
                    <h3>Installation et Configuration</h3>
                    <p>React Router n'est pas inclus par défaut dans React (React se veut léger). Il faut donc l'installer.</p>
                    <p>Ouvrez votre terminal dans votre dossier projet et tapez :</p>
                    <img src="/img/screenshot/react/partie4" alt="" />
                    <h4>L'enveloppe principale (Browser Router)</h4>
                    <p>Pour que la navigation fonctionne, nous devons envelopper toute notre application dans un composant spécial qui va "surveiller" l'URL du navigateur.</p>
                    <p>Ouvrez votre fichier principal (souvent <code>main.jsx</code> ou <code>index.js</code>) :</p>
                    <img src="/img/screenshot/react/partie4/code_browserrouter.png" alt="" />
                    <img src="/img/screenshot/react/partie4/schema_browserrouter.png" alt="" />
                    <h3>2. Définir vos Routes</h3>
                    <p>Maintenant, allons dans <code>App.jsx</code>. C'est ici que nous allons définir les règles du jeu : "Si l'URL est <code>/contact</code>, alors affiche le composant <code>{`<Contact />`}</code>".</p>
                    <p>Nous utilisons deux composants clés :</p>
                    <ul>
                        <li>1. <code>{`<Routes>`}</code>: Le conteneur qui regroupe toutes vos pages possibles.</li>
                        <li>2. <code>{`<Route>`}</code>: La définition d'une page spécifique</li>
                    </ul>
                    <img src="/img/screenshot/react/partie4/code_routes.png" alt="" />
                    <h3>3. Créer des liens de navigation</h3>
                    <p>C'est ici que 90% des débutants font une erreur.</p>
                    <p>En HTML classique, pour changer de page, vous utilisez la balise <code>{`<a>`}</code>. <strong>En React, il est interdit d'utiliser<code>{`<a href="...">`}</code>pour la navigation interne.</strong></p>
                    <p><strong>Pourquoi ?</strong> La balise <code>{`<a>`}</code> force le navigateur à recharger toute la page (et donc à re-télécharger tout le Javascript). Cela tue l'intérêt de la SPA et réinitialise tous vos  <code>{`useState`}</code> à zéro !</p>
                    <p>À la place, on utilise le composant <code>{`<Link>`}</code>.</p>
                    <img src="/img/screenshot/react/partie4/code_link.png" alt="" />
                    <img src="/img/screenshot/react/partie4/schema_link.png" alt="" />
                    <h3>4. Les paramètres d'URL (le Hook useParams)</h3>
                    <p>Souvent, vous voudrez afficher une page de détail, comme un profil utilisateur ou un article de blog. L'URL ressemblera à <code>/profil/42</code> ou <code>/profil/99</code>.</p>
                    <p>On appelle cela une <strong>route dynamique</strong>.</p>
                    <ul>
                        <li>
                            <p>1.<strong>Dans la Route :</strong> On utilise les deux-points <code>:</code> pour définir une variable.</p>
                            <img src="/img/screenshot/react/partie4/code_useparams_routes.png" alt="" />
                        </li>
                        <li>
                            <p>2. <strong>Dans le Composant :</strong> On récupère cette variable grâce au hook <code>useParams</code>.</p>
                            <img src="/img/screenshot/react/partie4/code_useparams_composant.png" alt="" />
                        </li>
                    </ul>
                    <h4>Résumé du chapitre</h4>
                    <p>Pour transformer votre application en un site multi-pages, rappelez-vous de cette structure en trois temps :</p>
                    <p>D'abord, <strong>l'installation</strong>. On installe<code>react-router-dom</code> et on englobe toute l'application avec <code>{`<BrowerRouter>`}</code> dans le fichier racine. C'est la fondation.</p>
                    <p>Ensuite, <strong>l'aiguillage</strong>.Dans votre fichier principal, utilisez <code>{`<Routes>`}</code> et <code>{`<Route>`}</code> pour associer chaque URL à un composant spécifique. C'est ici que vous définissez le plan de votre site.</p>
                    <p>Enfin, <strong>la navigation</strong>.Bannissez la balise<code>{`<a>`}</code> pour vos liens internes ! Utilisez toujours <code>{`<Link>`}</code> pour garantir une navigation instantanée et fluide sans rechargement de page. Si vous avez besoin de récupérer des infos depuis l'URL (comme un ID), utilisez le hook <code>useParams</code>.</p>
                    <p><strong>Et la suite ?</strong></p>
                    <p>Vous avez maintenant toutes les briques techniques :</p>
                    <ul>
                        <li>Tuto 1 & 2 : Les composants et le JSX.</li>
                        <li>Tuto 3 : La logique (Hooks).</li>
                        <li>Tuto 4 : La navigation (Router).</li>
                    </ul>
                    <p>Il est temps de tout assembler. Dans la <strong>dernière partie,</strong> nous allons arrêter la théorie pour construire un vrai projet de A à Z : <strong>Un gestionnaire de tâches (To-Do List)</strong>.</p>
                    <p><strong>Rendez-vous au Tuto 5 : Le projet final !</strong></p>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 5 ? "" : "hidden"}`}>
                    <h1>Partie 5 : Mini-Projet - Le Générateur de Citations</h1>
                    <p>Précédemment : Vous avez appris les Hooks et la Navigation. <strong>Objectif de cette partie :</strong> Pratiquer en créant une application multi-pages simple et amusante, sans se noyer dans la complexité.</p>
                    <h2>Introduction</h2>
                    <p>Pour valider vos connaissances, nous n'allons pas faire une usine à gaz. Nous allons créer une application "Zen".</p>
                    <p>Le concept : une application qui affiche une citation aléatoire à chaque clic, avec un menu de navigation pour aller sur une page de description.</p>
                    <p>Ce projet va vous permettre de :</p>
                    <ul>
                        <li>1. Créer une navigation fluide.</li>
                        <li>2. Manipuler des données simples (textes).</li>
                        <li>3. Utiliser les effets de bord (changer le titre du navigateur).</li>
                    </ul>
                    <h3>Étape 1 : Préparer les données</h3>
                    <p>Dans un vrai projet, on récupérerait ces données depuis une base de données. Pour simplifier, nous allons créer un fichier local.</p>
                    <p>Créez un fichier <code>citation.js</code> à côté de votre <code>App.jsx</code> et recopiez-y ceci: </p>
                    <img src="/img/screenshot/react/partie5/code_citations.png" alt="" />
                    <h3>Étape 2 : Créer la page "Générateur"</h3>
                    <p>C'est le cœur de notre application.</p>
                    <p>Créez un composant <code>Generateur.jsx</code>. Nous allons utiliser <code>useState</code> pour stocker l'index de la citation actuelle (par exemple : citation n°0, n°1, etc.).</p>
                    <img src="/img/screenshot/react/partie5/code_generateur.png" alt="" />
                    <img src="/img/screenshot/react/partie5/schema_maquette_generateur.png" alt="" />
                    <h3>Étape 3 : Créer la page "À Propos"</h3>
                    <p>Pour justifier l'utilisation du Router, créons une deuxième page très simple. Créez un fichier <code>APropos.jsx</code> :</p>
                    <img src="/img/screenshot/react/partie5/code_apropos.png" alt="" />
                    <h3>Étape 4 : Assembler le tout avec le Router</h3>
                    <p>Maintenant, nous devons configurer la navigation dans <code>App.jsx</code>. Nous allons aussi ajouter une petite barre de menu (Navbar) qui restera toujours visible en haut.</p>
                    <img src="/img/screenshot/react/partie5/code_app.png" alt="" />
                    <h3>Étape 5 : Exemple de CSS</h3>
                    <p>Pour que ce soit joli, voici un petit bout de CSS à mettre dans votre <code>index.css</code> (React l'applique automatiquement) :</p>
                    <img src="/img/screenshot/react/partie5/code_exemplecss.png" alt="" />

                    <h3>Conclusion du cours</h3>
                    <h4>MISSION ACCOMPLIE !</h4>
                    <p>Vous avez créé une application React complète qui :</p>
                    <ul>
                        <li><p>1. Navigue entre plusieurs pages sans rechargement (<strong>Router</strong>).</p></li>
                        <li><p>2. Gère de l'interactivité (<strong>useState</strong>).</p></li>
                        <li><p>3. Interagit avec le naviateur (<strong>useEffect</strong>).</p></li>
                        <li><p>4. Est structurée proprement avec des composants séparés.</p></li>
                    </ul>
                    <p><strong>Et maintenant ?</strong> Vous avez les clés en main. Vous pouvez améliorer ce projet en :</p>
                    <ul>
                        <li><p>Ajoutant vos propres citaions</p></li>
                        <li><p>Changeant la couleur de fond aléatoire à chaque citation (un autre <code>useState</code> !).</p></li>
                        <li><p>Récupérant les citations depuis une vraie API sur internet.</p></li>
                    </ul>
                    <p>Merci d'avoir suivi ce cursus. A vous de jouer maintenant !</p>
                </div>
            </div>
        </div>
    )
}