import { useState } from 'react';

export default function Compteur() {
    const [compteur, setCompteur] = useState(0);

    const incrementer = () => {
        // ⚠️ On ne fait JAMAIS : compteur = compteur + 1
        // ✅ On utilise toujours le setter :
        setCompteur(compteur + 1);
    };

    return (
        <div className="box">
        <p>Valeur actuelle : {compteur}</p>
        <button onClick={incrementer}>Ajouter +1</button>
        </div>
    );
}


