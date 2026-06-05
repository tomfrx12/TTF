import { useParams } from 'react-router-dom';

function Profil() {
  // Si l'URL est /profil/45, alors id vaudra "45"
  const { id } = useParams();

  return <h2>Vous visitez le profil de l'utilisateur n°{id}</h2>;
}


