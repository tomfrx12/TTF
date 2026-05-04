import { Link } from 'react-router-dom';

export default function APropos() {
  return (
    <div className="card">
      <h1>À propos</h1>
      <p>Cette application a été créée pour apprendre React.</p>
      <p>Elle utilise les Hooks useState et useEffect.</p>
      
      {/* Utilisation de Link pour ne pas recharger la page */}
      <Link to="/" className="btn-retour">
        ⬅️ Retour au générateur
      </Link>
    </div>
  );
}



