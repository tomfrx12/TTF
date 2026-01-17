import { Routes, Route, Link } from 'react-router-dom';
import Generateur from './Generateur';
import APropos from './APropos';

function App() {
  return (
    <div className="App">
      {/* 1. La Navbar (reste toujours affichée) */}
      <nav style={{ borderBottom: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Accueil</Link>
        <Link to="/about">À Propos</Link>
      </nav>

      {/* 2. L'endroit où les pages changent */}
      <Routes>
        <Route path="/" element={<Generateur />} />
        <Route path="/about" element={<APropos />} />
      </Routes>
    </div>
  );
}

export default App;




