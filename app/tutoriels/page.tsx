export const dynamic = "force-dynamic";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import Link from "next/link";
import CardTuto from "@/components/CardTuto";

type SearchParams = {
  q?: string | string[];
  category?: string | string[];
  sort?: string | string[];
};

type PostWithRelations = Prisma.PostGetPayload<{
  include: {
    author: {
      select: {
        firstname: true;
        name: true;
      };
    };
    tags: true;
  };
}>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getCategoryLabel(post: PostWithRelations) {
  return post.tags[0]?.name ?? "Tutoriel";
}

export default async function TutosPage({ searchParams }: { searchParams?: SearchParams }) {
  const query = (firstValue(searchParams?.q) ?? "").trim().toLowerCase();
  const category = firstValue(searchParams?.category) ?? "all";
  const sort = firstValue(searchParams?.sort) ?? "recent";

  const [posts, publishedCount, categoryRows, usersCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            firstname: true,
            name: true,
          },
        },
        tags: true,
      },
    }) as Promise<PostWithRelations[]>,
    prisma.post.count({ where: { published: true } }),
    prisma.tag.findMany({
      select: { name: true },
      orderBy: { name: "asc" },
    }),
    prisma.user.count(),
  ]);

  const categories = ["all", ...Array.from(new Set(categoryRows.map((tag) => tag.name)))];

  const filteredPosts = posts
    .filter((post) => {
      const matchesQuery =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.name.toLowerCase().includes(query));

      const matchesCategory =
        category === "all" || post.tags.some((tag) => tag.name === category);

      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "oldest") {
        return a.createAt.getTime() - b.createAt.getTime();
      }

      return b.createAt.getTime() - a.createAt.getTime();
    });

  const featuredPost = filteredPosts[0] ?? posts[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,78,176,0.12),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)] px-4 py-12 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <div className="lg:items-center">
          <div className="rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-primary)">Tuto à la une</p>
            {featuredPost ? (
              <div className="mt-4 space-y-5">
                <div className="rounded-3xl bg-[linear-gradient(135deg,rgba(34,78,176,0.14),rgba(231,119,188,0.14))] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                    {getCategoryLabel(featuredPost)}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">{featuredPost.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{featuredPost.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                  <span>
                    Par <strong className="text-slate-700">{featuredPost.author.firstname} {featuredPost.author.name}</strong>
                  </span>
                  <span>{formatDate(featuredPost.createAt)}</span>
                </div>

                <Link
                  href={`/tutoriels/${featuredPost.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-(--color-primary)/20 transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  Commencer la lecture
                </Link>
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
                Aucun tutoriel publié pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
        <form method="get" className="grid gap-4 lg:grid-cols-[1.1fr_0.7fr_0.6fr_auto]">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={firstValue(searchParams?.q) ?? ""}
              placeholder="Recherche de tutos..."
              className="w-full rounded-2xl border border-slate-200 bg-(--color-white-break) px-4 py-3 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:border-(--color-primary) focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              name="sort"
              defaultValue={sort}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-(--color-white-break) px-4 py-3 text-sm font-medium text-slate-700 shadow-sm focus:border-(--color-primary) focus:outline-none"
            >
              <option value="recent">Les plus récents</option>
              <option value="oldest">Les plus anciens</option>
              <option value="none">Date d’ajout</option>
            </select>
          </div>

          <div className="relative">
            <select
              name="category"
              defaultValue={category}
              className="w-full appearance-none rounded-2xl border border-slate-200 bg-(--color-white-break) px-4 py-3 text-sm font-medium text-slate-700 shadow-sm focus:border-(--color-primary) focus:outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "all" ? "Toutes les catégories" : item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            Filtrer
          </button>
        </form>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-primary)">Catalogue</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">Tutoriels disponibles</h2>
          </div>
          <p className="text-sm text-slate-500">{filteredPosts.length} résultat(s)</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 md:col-span-2">
              Aucun tutoriel trouvé avec ces critères.
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Link key={post.id} href={`/tutoriels/${post.slug}`} className="block transition-transform duration-200 hover:-translate-y-1">
                <CardTuto
                  name={getCategoryLabel(post)}
                  title={post.title}
                  description={post.description}
                />
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
