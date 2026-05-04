import { Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Contact from './pages/Contact';
import Erreur404 from './pages/Erreur404';

function App() {
  return (
    <div className="App">
      <h1>Mon super site</h1>
      
      {/* Le système d'aiguillage */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/contact" element={<Contact />} />
        {/* L'étoile * signifie "n'importe quoi d'autre" (pour la 404) */}
        <Route path="*" element={<Erreur404 />} />
      </Routes>
    </div>
  );
}


