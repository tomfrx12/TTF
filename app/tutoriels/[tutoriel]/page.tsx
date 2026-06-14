import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import CompletionButton from "@/components/CompletionButton";

interface Props {
  params: Promise<{ tutoriel: string }>;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function TutorielPage({ params }: Props) {
  const { tutoriel: slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: {
        select: { firstname: true, name: true },
      },
      tags: true,
    },
  });

  if (!post || !post.published) notFound();

  return (
    <main className="min-h-screen bg-(--color-white-break) py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        <Link
          href="/tutoriels"
          className="text-sm font-semibold text-(--color-primary) hover:text-(--color-secondary) transition-colors duration-300 inline-flex items-center gap-1 mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Retour aux tutoriels
        </Link>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-(--color-primary) text-white"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-extrabold text-(--color-black-break) tracking-tight sm:text-4xl mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
          <span>
            Par{" "}
            <strong className="text-(--color-black-break)">
              {post.author.firstname} {post.author.name}
            </strong>
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{formatDate(post.createAt)}</span>
        </div>

        {post.imageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-64 sm:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 space-y-6">
          <p className="text-base text-gray-500 leading-relaxed border-l-4 border-(--color-secondary) pl-4 italic">
            {post.description}
          </p>

          <div className="border-t border-gray-100" />

          <div className="text-sm sm:text-base text-(--color-black-break) leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center">
          <Link
            href="/tutoriels"
            className="text-sm font-semibold text-(--color-primary) hover:text-(--color-secondary) transition-colors duration-300 inline-flex items-center gap-1 group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Tous les tutoriels
          </Link>
          <CompletionButton postId={post.id} />
        </div>
      </div>
    </main>
  );
}
