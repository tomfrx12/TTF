import { useState } from "react";

import { X } from 'lucide-react';

export default function ReactTuto() {
    var [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex">
            <div id="menu" className={`${ isOpen ? "w-64" : "w-0"} transition-all duration-200`}> 
                <div className={`bg-white min-h-screen overflow-y-scroll ${ isOpen ? "w-64" : "hidden"}`}>
                    <div className="flex justify-between items-center bg-white p-4 border-b border-gray-500 w-full h-20 top-0 sticky">
                        <p className='font-bold'>Tables des parties</p>
                        <X className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}/>
                    </div>
                    <ul className="px-2">
                        <li className="p-3">
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 1</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">S'initier a React.js</p>
                        </li>
                        <li className="p-3">
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 2</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Du HTML / JS classique a React.js</p>
                        </li>
                        <li className="p-3">
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 3</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Apprendre à utiliser useState, useEffect et useRef</p>
                        </li>
                        <li className="p-3">
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 4</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Comprendre le Routing avec React Router Dom !</p>
                        </li>
                        <li className="p-3">
                            <span className="text-[#00838F] text-xs font-medium uppercase">Partie 5</span>
                            <p className="max-w-fit font-medium text-base cursor-pointer hover:text-[#7451eb]">Mettre en pratiques les notions vu précédemment</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="content" className={`flex-1 mx-auto ${ isOpen ? "max-w-200" : "w-full"}`}>
                <div className="px-8 py-4">
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
                    <p>Dans la<strong>Partie 4</strong>, nous allons installer<strong>React Router</strong>pour transformer nos simples composants en véritables pages connectées (Accueil, À propos, Contact...).</p>
                    <p><strong>Rendez-vous au chapitre suivant : Comprendre le Routing !</strong></p>
                </div>
            </div>
        </div>
    )
}