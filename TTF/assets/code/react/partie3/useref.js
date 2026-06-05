import { useRef } from 'react';

export default function Formulaire() {
    const inputRef = useRef(null); // 1. On crée la référence

    const forcerLeFocus = () => {
        // 3. On agit directement sur l'élément HTML
        inputRef.current.focus();
    };

    return (
        <>
            {/* 2. On attache la référence à la balise */}
            <input ref={inputRef} type="text" />
            <button onClick={forcerLeFocus}>Écrire</button>
        </>
    );
}


