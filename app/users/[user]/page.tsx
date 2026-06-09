interface Props {
  params: { user: string };
}

export default function UserPage({ params }: Props) {
  return (
    <main>
      <h1>Utilisateur: {params.user}</h1>
      <p>Page profil utilisateur — contenu à ajouter.</p>
    </main>
  );
}
