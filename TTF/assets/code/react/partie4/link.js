import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      {/* MAUVAIS : Recharge la page */}
      <a href="/contact">Contact (Lent)</a>

      {/* BON : Change juste le composant (Instantané) */}
      <Link to="/contact">Contact (Rapide)</Link>
      <Link to="/">Retour accueil</Link>
    </nav>
  );
}




