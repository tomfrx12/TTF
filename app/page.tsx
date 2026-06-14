import { prisma } from "@/lib/db";
import Link from "next/link";

const steps = [
  {
    title: "Découvrir",
    text: "Parcours les tutoriels publiés et repère les sujets qui t’intéressent.",
  },
  {
    title: "Lire",
    text: "Chaque contenu va à l’essentiel avec une logique pédagogique simple.",
  },
  {
    title: "Passer à l’action",
    text: "Applique directement ce que tu apprends dans tes projets.",
  },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function Index() {
  const [latestPosts, publishedCount, tagCount, usersCount] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      orderBy: { createAt: "desc" },
      take: 3,
      include: {
        author: {
          select: { firstname: true, name: true },
        },
        tags: true,
      },
    }),
    prisma.post.count({ where: { published: true } }),
    prisma.tag.count(),
    prisma.user.count(),
  ]);

  const hasPosts = latestPosts.length > 0;

  return (
    <main className="min-h-screen text-slate-900">
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-72 blur-3xl" />

        <div className="mx-auto max-w-6xl items-center gap-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-(--color-primary) shadow-sm backdrop-blur">
              Plateforme de tutoriels TTF
            </span>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Apprendre, transmettre, progresser avec des contenus clairs.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              TTF rassemble des tutoriels, des articles pratiques et des ressources pédagogiques pensées pour guider les lecteurs du premier pas jusqu’à la mise en pratique.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tutoriels"
                className="inline-flex items-center justify-center rounded-full bg-(--color-primary) px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-(--color-primary)/20 transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                Explorer les tutoriels
              </Link>
              <Link
                href="/charte-editoriale"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                Voir la charte éditoriale
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Tutoriels publiés", value: publishedCount },
              { label: "Thématiques", value: tagCount },
              { label: "Utilisateurs", value: usersCount },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
                <div className="text-3xl font-black text-slate-950">{item.value}</div>
                <div className="mt-1 text-sm text-slate-600">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-sm sm:p-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-primary)">
                Derniers contenus
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                Les tutoriels récemment publiés
              </h2>
            </div>

            <Link href="/tutoriels" className="hidden text-sm font-semibold text-(--color-primary) transition-colors hover:text-(--color-secondary) sm:block">
              Voir tout
            </Link>
          </div>

          {hasPosts ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {latestPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`relative h-44 overflow-hidden bg-[linear-gradient(135deg,rgba(34,78,176,0.18),rgba(231,119,188,0.18),rgba(15,23,42,0.08))] ${index === 1 ? "bg-[linear-gradient(135deg,rgba(231,119,188,0.18),rgba(15,23,42,0.08),rgba(34,78,176,0.18))]" : ""}`}>
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-700/80">
                          {post.tags[0]?.name ?? "Tutoriel"}
                        </p>
                        <h3 className="mt-2 max-w-sm text-2xl font-black leading-tight text-slate-950">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm leading-7 text-slate-600 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                          #{tag.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500">
                      <span>
                        Par <strong className="text-slate-700">{post.author.firstname} {post.author.name}</strong>
                      </span>
                      <span>{formatDate(post.createAt)}</span>
                    </div>

                    <Link
                      href={`/tutoriels/${post.slug}`}
                      className="mt-5 inline-flex items-center text-sm font-semibold text-(--color-primary) transition-colors hover:text-(--color-secondary)"
                    >
                      Lire le tutoriel
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="text-lg font-semibold text-slate-900">Aucun tutoriel publié pour le moment.</p>
              <p className="mt-2 text-sm text-slate-600">
                La home reste prête à accueillir les premiers contenus dès qu’ils seront ajoutés dans la base.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-4xl bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/60">Parcours recommandé</p>
            <h2 className="mt-3 text-3xl font-black">Une lecture simple, en trois étapes.</h2>
            <div className="mt-8 space-y-5">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--color-secondary) text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-white/75">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-(--color-primary)">Pourquoi cette page</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">Une vraie page d’accueil pour présenter le site.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              L’objectif ici est d’expliquer immédiatement ce que fait TTF, de rassurer le visiteur et de lui donner un point d’entrée clair vers les tutoriels, la charte éditoriale et les contenus récents.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Lecture rapide",
                "Navigation claire",
                "Mise en avant des contenus",
                "Ton pédagogique",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tutoriels"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                Aller aux tutoriels
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-transform duration-200 hover:-translate-y-0.5 hover:border-(--color-primary) hover:text-(--color-primary)"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}