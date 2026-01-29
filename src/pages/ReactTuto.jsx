import { useState } from "react";

import { X } from 'lucide-react';
import Text from "../components/Text";
import Code from "../components/Code";

export default function ReactTuto() {
    var [isOpen, setIsOpen] = useState(true);
    var [isPartie, setIsPartie] = useState(1);

    return (
        <div className="flex">
            <div className={`${ isOpen ? "w-lg" : "w-0"} transition-all duration-200`}> 
                <div className={`bg-white min-h-screen overflow-y-scroll ${ isOpen ? "w-lg" : "hidden"}`}>
                    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-500 w-full h-20 top-0 sticky">
                        <Text name='p' className='font-bold'>Tables des parties</Text>
                        <X className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
                    </div>
                    <ul className="px-6">
                        <li className="p-3" onClick={() => setIsPartie(1)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 1</span>
                            <Text name='p' className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">S'initier a React.js</Text>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(2)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 2</span>
                            <Text name='p' className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Du HTML / JS classique a React.js</Text>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(3)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 3</span>
                            <Text name='p' className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Apprendre à utiliser useState, useEffect et useRef</Text>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(4)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 4</span>
                            <Text name='p' className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Comprendre le Routing avec React Router Dom !</Text>
                        </li>
                        <li className="p-3" onClick={() => setIsPartie(5)}>
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 5</span>
                            <Text name='p' className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Mettre en pratiques les notions vu précédemment</Text>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content" className="flex-1 mx-auto max-w-200">
                <div className={`px-8 py-4 ${ isPartie == 1 ? "" : "hidden"}`}>
                    <span className="text-4xl font-bold">Partie 1</span>
                    <Text name='h1'>S'initier à React.js avec un screencast</Text>
                    <video controls>
                        <source src="/vid/partie1/Tuto-1_screencast.mp4" type="video/mp4" />
                    </video>

                    <Code></Code>

                </div>
                <div className={`px-8 py-4 ${ isPartie == 2 ? "" : "hidden"}`}>
                    <span className="text-4xl font-bold">Partie 2</span>
                    <Text name='h1'>HTML/JS vs React: en motion design</Text>
                    <video controls>
                        <source src="/vid/partie2/Tutos-2_motion-design.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 3 ? "flex flex-col" : "hidden"}`}>
                    <span className="text-4xl font-bold">Partie 3 :</span>
                    <Text name='h1'>Donnez vie à vos composants avec les Hooks</Text>
                    <Text name='p'>Précédemment : Dans la partie 2, nous avons vu la philosophie de React à travers l'animation. Vous avez compris que React met à jour le DOM intelligemment. Objectif de cette partie : Apprendre à gérer la logique, les données et les événements.</Text>
                    <Text name='h2'>Introduction</Text>
                    <Text name='p'>Bravo d'être arrivé jusqu'ici !</Text>
                    <Text name='p'>Jusqu'à présent, nos composants étaient de simples "coquilles vides" : ils affichaient du HTML, mais ils ne faisaient pas grand-chose. Ils étaient statiques. Or, une application moderne, ça bouge : on clique, on remplit des formulaires, des compteurs s'incrémentent, des données se chargent...</Text>
                    <Text name='p'>Pour faire tout cela, React utilise un concept fondamental : <strong className="font-semibold">les Hooks.</strong></Text>
                    <Text name='p'>Ce sont des fonctions spéciales qui permettent de "se brancher" (to hook up) aux fonctionnalités de React. Nous allons voir les trois plus importants, ceux que vous utiliserez 90% du temps :</Text>
                    <ul className="ml-4">
                        <li className="ml-4">1. useState (L'état)</li>
                        <li className="ml-4">2. useEffect (L'effet)</li>
                        <li className="ml-4">3. useRef (La référence)</li>
                    </ul>
                    <Text name='h3'>1. useState : La mémoire du composant</Text>
                    <Text name='p'>Rappelez-vous : un composant est une fonction. En JavaScript classique, quand une fonction se termine, toutes ses variables disparaissent.</Text>
                    <Text name='p'>Mais en React, nous avons besoin que notre composant se souvienne de certaines choses (est-ce que le menu est ouvert ? combien d'articles sont dans le panier ?). C'est le rôle de useState.</Text>
                    <Text name='p'><strong className="font-semibold">La mécanique</strong></Text>
                    <img src="/img/screenshot/react/partie3/setstate.png" alt="" />
                    <Text name='p'>Pour l'utiliser, on "déstructure" le tableau qu'il nous renvoie :</Text>
                    <img src="/img/screenshot/react/partie3/code_setstate.png" alt="" />
                    <Text name='p'><strong className="font-semibold">Exercice</strong> : Le Compteur</Text>
                    <Text name='p'>C'est l'exemple le plus classique, mais c'est le meilleur pour comprendre.</Text>
                    <img src="/img/screenshot/react/partie3/exercice_compteur.png" alt="" />
                    <Text name='p'><strong className="font-semibold">Le concept clé :</strong>À chaque fois que vous appelez setCompteur, React comprend que la donnée a changé. Il relance alors la fonction de votre composant pour mettre à jour l'affichage. C'est le "Re-render".</Text>
                    <Text name='h3'>2. useEffect : Gérer les effets de bord</Text>
                    <Text name='p'>Maintenant que notre composant a une mémoire, il doit parfois interagir avec le monde extérieur (le navigateur, une API, un timer). On appelle ça des "effets de bord".</Text>
                    <Text name='p'>Le problème : si on met ce code directement dans le composant, il s'exécutera à chaque fois que le composant s'affiche (ce qui peut arriver des centaines de fois !). On utilise useEffect pour contrôler quand ces actions se produisent.</Text>
                    <Text name='p'><strong className="font-semibold">Le tableau de dépendances</strong></Text>
                    <Text name='p'>C'est le pilote de votre effet. Il se trouve en deuxième argument du hook.</Text>
                    <img src="/img/screenshot/react/partie3/useeffect.webp" alt="" />
                    <Text name='p'>Prenons un exemple concret : nous voulons changer le titre de l'onglet du navigateur à chaque fois que notre compteur change.</Text>
                    <img src="/img/screenshot/react/partie3/code_useeffect.png" alt="" />
                    <Text name='p'><strong className="font-semibold">Astuce de pro :</strong>Si vous voulez charger des données depuis une API au chargement de la page, utilisez un tableau vide []. Cela garantit que la requête ne partira qu'une seule fois !</Text>
                    <Text name='h3'>3. useRef : Accéder au DOM directement</Text>
                    <Text name='p'>Parfois, useState est trop "lourd". Si vous voulez juste cibler un champ de texte pour mettre le curseur dedans, vous n'avez pas besoin de relancer tout le composant.</Text>
                    <Text name='p'>useRef permet de créer une référence vers un élément HTML réel. C'est comme mettre un post-it sur une balise pour la retrouver plus tard.</Text>
                    <Text name='p'><strong className="font-semibold">Exemple : Le Focus automatique</strong></Text>
                    <img src="/img/screenshot/react/partie3/liaison_useref.png" alt="" />
                    <img src="/img/screenshot/react/partie3/code_useref.png" alt="" />
                    <Text name='h4'>Résumé du chapitre</Text>
                    <Text name='p'>Pour bien choisir votre outil, retenez ces trois règles d'or :</Text>
                    <Text name='p'>Premièrement, utilisez useState dès que l'information doit être visible à l'écran. Si la donnée change (un score, un formulaire, une couleur), et que l'interface doit changer aussi, c'est un State. C'est le seul qui déclenche une mise à jour visuelle.</Text>
                    <Text name='p'>Deuxièmement, utilisez useEffect pour synchroniser votre composant avec l'extérieur. Si vous devez lancer un timer, appeler une base de données ou modifier le titre de la page, c'est ici que ça se passe. N'oubliez jamais le tableau de dépendances pour éviter les boucles infinies !</Text>
                    <Text name='p'>Enfin, gardez useRef sous le coude pour les cas techniques. Si vous devez manipuler une balise HTML précise (comme un input ou une vidéo) ou stocker une valeur "secrète" qui ne doit pas provoquer de rafraîchissement de la page, c'est l'outil idéal.</Text>
                    <Text name='p'><strong className="font-semibold">Et la suite ?</strong></Text>
                    <Text name='p'>Maintenant que vous savez gérer la logique d'un composant isolé, nous allons voir comment <strong className="font-semibold">naviguer</strong> entre ces composants.</Text>
                    <Text name='p'>Dans la <strong className="font-semibold">Partie 4</strong>, nous allons installer <strong className="font-semibold">React Router</strong> pour transformer nos simples composants en véritables pages connectées (Accueil, À propos, Contact...).</Text>
                    <Text name='p'><strong className="font-semibold">Rendez-vous au chapitre suivant : Comprendre le Routing !</strong></Text>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 4 ? "flex flex-col" : "hidden"}`}>
                    <span className="text-4xl font-bold">Partie 4 :</span>
                    <Text name='h1'>Naviguer entre les pages avec React Router</Text>
                    <Text name='p'>Précédemment : Dans la partie 3, vous avez appris à gérer l'état et les effets de vos composants avec les Hooks. <strong className="font-semibold">Objectif de cette partie :</strong>Créer une véritable architecture de site web avec plusieurs pages, sans jamais recharger le navigateur.</Text>
                    <Text name='h2'>Introduction</Text>
                    <Text name='p'>Jusqu'à maintenant, votre application React s'affichait sur une seule "page". Si vous vouliez voir un autre composant, vous deviez modifier le code manuellement pour l'afficher à la place de l'autre.</Text>
                    <Text name='p'>Dans la vraie vie, un site a des URLs : <code>/accueil</code> , <code>/contact</code> , <code>/produit/12</code> .</Text>
                    <Text name='p'>Mais attention ! React fonctionne comme une <strong className="font-semibold">SPA (Single Page Application)</strong>. Contrairement à un site classique qui demande une nouvelle page au serveur à chaque clic, une SPA <strong className="font-semibold">simule</strong> la navigation. Elle reste sur la même page HTML, mais change le contenu JavaScript à l'intérieur.</Text>
                    <Text name='p'>our faire cela, nous avons besoin d'un chef d'orchestre : <strong className="font-semibold">React Router</strong>.</Text>
                    <Text name='h3'>Installation et Configuration</Text>
                    <Text name='p'>React Router n'est pas inclus par défaut dans React (React se veut léger). Il faut donc l'installer.</Text>
                    <Text name='p'>Ouvrez votre terminal dans votre dossier projet et tapez :</Text>
                    <img src="/img/screenshot/react/partie4" alt="" />
                    <Text name='h4'>L'enveloppe principale (Browser Router)</Text>
                    <Text name='p'>Pour que la navigation fonctionne, nous devons envelopper toute notre application dans un composant spécial qui va "surveiller" l'URL du navigateur.</Text>
                    <Text name='p'>Ouvrez votre fichier principal (souvent <code>main.jsx</code> ou <code>index.js</code>) :</Text>
                    <img src="/img/screenshot/react/partie4/code_browserrouter.png" alt="" />
                    <img src="/img/screenshot/react/partie4/schema_browserrouter.png" alt="" />
                    <Text name='h3'>2. Définir vos Routes</Text>
                    <Text name='p'>Maintenant, allons dans <code>App.jsx</code>. C'est ici que nous allons définir les règles du jeu : "Si l'URL est <code>/contact</code>, alors affiche le composant <code>{`<Contact />`}</code>".</Text>
                    <Text name='p'>Nous utilisons deux composants clés :</Text>
                    <ul className="ml-4">
                        <li className="ml-4">1. <code>{`<Routes>`}</code>: Le conteneur qui regroupe toutes vos pages possibles.</li>
                        <li className="ml-4">2. <code>{`<Route>`}</code>: La définition d'une page spécifique</li>
                    </ul>
                    <img src="/img/screenshot/react/partie4/code_routes.png" alt="" />
                    <Text name='h3'>3. Créer des liens de navigation</Text>
                    <Text name='p'>C'est ici que 90% des débutants font une erreur.</Text>
                    <Text name='p'>En HTML classique, pour changer de page, vous utilisez la balise <code>{`<a>`}</code>. <strong className="font-semibold">En React, il est interdit d'utiliser <code>{`<a href="...">`}</code> pour la navigation interne.</strong></Text>
                    <Text name='p'><strong className="font-semibold">Pourquoi ?</strong> La balise <code>{`<a>`}</code> force le navigateur à recharger toute la page (et donc à re-télécharger tout le Javascript). Cela tue l'intérêt de la SPA et réinitialise tous vos  <code>{`useState`}</code> à zéro !</Text>
                    <Text name='p'>À la place, on utilise le composant <code>{`<Link>`}</code>.</Text>
                    <img src="/img/screenshot/react/partie4/code_link.png" alt="" />
                    <img src="/img/screenshot/react/partie4/schema_link.png" alt="" />
                    <Text name='h3'>4. Les paramètres d'URL (le Hook useParams)</Text>
                    <Text name='p'>Souvent, vous voudrez afficher une page de détail, comme un profil utilisateur ou un article de blog. L'URL ressemblera à <code>/profil/42</code> ou <code>/profil/99</code>.</Text>
                    <Text name='p'>On appelle cela une <strong className="font-semibold">route dynamique</strong>.</Text>
                    <ul className="ml-4">
                        <li className="ml-4 flex flex-col">
                            <Text name='p'>1.<strong className="font-semibold">Dans la Route :</strong> On utilise les deux-points <code>:</code> pour définir une variable.</Text>
                            <img src="/img/screenshot/react/partie4/code_useparams_routes.png" alt="" />
                        </li>
                        <li className="ml-4 flex flex-col">
                            <Text name='p'>2. <strong className="font-semibold">Dans le Composant :</strong> On récupère cette variable grâce au hook <code>useParams</code>.</Text>
                            <img src="/img/screenshot/react/partie4/code_useparams_composant.png" alt="" />
                        </li>
                    </ul>
                    <Text name='h4'>Résumé du chapitre</Text>
                    <Text name='p'>Pour transformer votre application en un site multi-pages, rappelez-vous de cette structure en trois temps :</Text>
                    <Text name='p'>D'abord, <strong className="font-semibold">l'installation</strong>. On installe<code>react-router-dom</code> et on englobe toute l'application avec <code>{`<BrowerRouter>`}</code> dans le fichier racine. C'est la fondation.</Text>
                    <Text name='p'>Ensuite, <strong className="font-semibold">l'aiguillage</strong>.Dans votre fichier principal, utilisez <code>{`<Routes>`}</code> et <code>{`<Route>`}</code> pour associer chaque URL à un composant spécifique. C'est ici que vous définissez le plan de votre site.</Text>
                    <Text name='p'>Enfin, <strong className="font-semibold">la navigation</strong>.Bannissez la balise<code>{`<a>`}</code> pour vos liens internes ! Utilisez toujours <code>{`<Link>`}</code> pour garantir une navigation instantanée et fluide sans rechargement de page. Si vous avez besoin de récupérer des infos depuis l'URL (comme un ID), utilisez le hook <code>useParams</code>.</Text>
                    <Text name='p'><strong className="font-semibold">Et la suite ?</strong></Text>
                    <Text name='p'>Vous avez maintenant toutes les briques techniques :</Text>
                    <ul className="ml-4">
                        <li className="ml-4">Tuto 1 & 2 : Les composants et le JSX.</li>
                        <li className="ml-4">Tuto 3 : La logique (Hooks).</li>
                        <li className="ml-4">Tuto 4 : La navigation (Router).</li>
                    </ul>
                    <Text name='p'>Il est temps de tout assembler. Dans la <strong className="font-semibold">dernière partie,</strong> nous allons arrêter la théorie pour construire un vrai projet de A à Z : <strong className="font-semibold">Un générateur de citations</strong>.</Text>
                    <Text name='p'><strong className="font-semibold">Rendez-vous au Tuto 5 : Le projet final !</strong></Text>
                </div>
                <div className={`px-8 py-4 ${ isPartie == 5 ? "flex flex-col" : "hidden"}`}>
                    <span className="text-4xl font-bold">Partie 5 :</span>
                    <Text name='h1'>Mini-Projet - Le Générateur de Citations</Text>
                    <Text name='p'>Précédemment : Vous avez appris les Hooks et la Navigation. <strong className="font-semibold">Objectif de cette partie :</strong> Pratiquer en créant une application multi-pages simple et amusante, sans se noyer dans la complexité.</Text>
                    <Text name='h2'>Introduction</Text>
                    <Text name='p'>Pour valider vos connaissances, nous n'allons pas faire une usine à gaz. Nous allons créer une application "Zen".</Text>
                    <Text name='p'>Le concept : une application qui affiche une citation aléatoire à chaque clic, avec un menu de navigation pour aller sur une page de description.</Text>
                    <Text name='p'>Ce projet va vous permettre de :</Text>
                    <ul className="ml-4">
                        <li className="ml-4">1. Créer une navigation fluide.</li>
                        <li className="ml-4">2. Manipuler des données simples (textes).</li>
                        <li className="ml-4">3. Utiliser les effets de bord (changer le titre du navigateur).</li>
                    </ul>
                    <Text name='h3'>Étape 1 : Préparer les données</Text>
                    <Text name='p'>Dans un vrai projet, on récupérerait ces données depuis une base de données. Pour simplifier, nous allons créer un fichier local.</Text>
                    <Text name='p'>Créez un fichier <code>citation.js</code> à côté de votre <code>App.jsx</code> et recopiez-y ceci: </Text>
                    <img src="/img/screenshot/react/partie5/code_citations.png" alt="" />
                    <Text name='h3'>Étape 2 : Créer la page "Générateur"</Text>
                    <Text name='p'>C'est le cœur de notre application.</Text>
                    <Text name='p'>Créez un composant <code>Generateur.jsx</code>. Nous allons utiliser <code>useState</code> pour stocker l'index de la citation actuelle (par exemple : citation n°0, n°1, etc.).</Text>
                    <img src="/img/screenshot/react/partie5/code_generateur.png" alt="" />
                    <img src="/img/screenshot/react/partie5/schema_maquette_generateur.png" alt="" />
                    <Text name='h3'>Étape 3 : Créer la page "À Propos"</Text>
                    <Text name='p'>Pour justifier l'utilisation du Router, créons une deuxième page très simple. Créez un fichier <code>APropos.jsx</code> :</Text>
                    <img src="/img/screenshot/react/partie5/code_apropos.png" alt="" />
                    <Text name='h3'>Étape 4 : Assembler le tout avec le Router</Text>
                    <Text name='p'>Maintenant, nous devons configurer la navigation dans <code>App.jsx</code>. Nous allons aussi ajouter une petite barre de menu (Navbar) qui restera toujours visible en haut.</Text>
                    <img src="/img/screenshot/react/partie5/code_app.png" alt="" />
                    <Text name='h3'>Étape 5 : Exemple de CSS</Text>
                    <Text name='p'>Pour que ce soit joli, voici un petit bout de CSS à mettre dans votre <code>index.css</code> (React l'applique automatiquement) :</Text>
                    <img src="/img/screenshot/react/partie5/code_exemplecss.png" alt="" />

                    <Text name='h3'>Conclusion du cours</Text>
                    <Text name='h4'>MISSION ACCOMPLIE !</Text>
                    <Text name='p'>Vous avez créé une application React complète qui :</Text>
                    <ul className="ml-4">
                        <li className="ml-4"><Text name='p'>1. Navigue entre plusieurs pages sans rechargement (<strong className="font-semibold">Router</strong>).</Text></li>
                        <li className="ml-4"><Text name='p'>2. Gère de l'interactivité (<strong className="font-semibold">useState</strong>).</Text></li>
                        <li className="ml-4"><Text name='p'>3. Interagit avec le naviateur (<strong className="font-semibold">useEffect</strong>).</Text></li>
                        <li className="ml-4"><Text name='p'>4. Est structurée proprement avec des composants séparés.</Text></li>
                    </ul>
                    <Text name='p'><strong className="font-semibold">Et maintenant ?</strong> Vous avez les clés en main. Vous pouvez améliorer ce projet en :</Text>
                    <ul className="ml-4">
                        <li className="ml-4"><Text name='p'>Ajoutant vos propres citaions</Text></li>
                        <li className="ml-4"><Text name='p'>Changeant la couleur de fond aléatoire à chaque citation (un autre <code>useState</code> !).</Text></li>
                        <li className="ml-4"><Text name='p'>Récupérant les citations depuis une vraie API sur internet.</Text></li>
                    </ul>
                    <Text name='p'>Merci d'avoir suivi ce cursus. A vous de jouer maintenant !</Text>
                </div>
            </div>
        </div>
    )
}