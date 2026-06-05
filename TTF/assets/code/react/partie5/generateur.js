import { useState, useEffect } from 'react';
import { citations } from './citations'; // On importe nos données

export default function Generateur() {
  // On commence par la première citation (index 0)
  const [index, setIndex] = useState(0);

  // Fonction pour changer de citation au hasard
  const citationAleatoire = () => {
    // Math.random génère un chiffre entre 0 et la taille du tableau
    const nouveauIndex = Math.floor(Math.random() * citations.length);
    setIndex(nouveauIndex);
  };

  // Récupération de la citation actuelle
  const citationActuelle = citations[index];

  // UTILISATION DE USEEFFECT :
  // À chaque fois que la citation change, on met l'auteur dans le titre de l'onglet
  useEffect(() => {
    document.title = `Citation de ${citationActuelle.auteur}`;
  }, [citationActuelle]); // Dépendance : se relance quand la citation change

  return (
    <div className="card">
      <h1>💡 Inspiration du jour</h1>
      
      <blockquote>
        "{citationActuelle.texte}"
      </blockquote>
      <p>- {citationActuelle.auteur} -</p>

      <button onClick={citationAleatoire}>
        Nouvelle citation
      </button>
    </div>
  );
}




