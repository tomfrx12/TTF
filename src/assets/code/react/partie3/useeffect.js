import { useState, useEffect } from 'react';

export default function TitreDynamique() {
    const [compteur, setCompteur] = useState(0);

    // useEffect surveille la variable 'compteur'
    useEffect(() => {
        document.title = `Total clics : ${compteur}`;
        
        // Ce code ne se relancera QUE si 'compteur' change
    }, [compteur]); 

    return <button onClick={() => setCompteur(compteur + 1)}>Clic</button>;
}


