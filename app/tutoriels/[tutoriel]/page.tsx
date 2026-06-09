interface Props {
  params: { tutoriel: string };
}

export default function TutorielPage({ params }: Props) {
  return (
    <main>
      <h1>Tutoriel: {params.tutoriel}</h1>
      <p>Page du tutoriel — contenu à ajouter.</p>
    </main>
  );
}
