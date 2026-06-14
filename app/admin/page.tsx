"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Tag = { id: number; name: string };
type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string | null;
  published: boolean;
  createAt: string;
  tags: Tag[];
};

type Mode = "ajouter" | "modifier" | "supprimer" | "categories";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyForm = {
  title: "",
  description: "",
  content: "",
  tagIds: [] as number[],
  imageUrl: "",
  published: true,
};

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, isLog, user: connectedUser } = useAuth();

  const [mode, setMode] = useState<Mode>("ajouter");
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [form, setForm] = useState({ ...emptyForm });
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [newCatName, setNewCatName] = useState("");
  const [editingTagId, setEditingTagId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [catMsg, setCatMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (isLog && !isAdmin) {
      router.push("/");
      return;
    }
    if (!isAdmin) return;

    Promise.all([
      fetch("/api/posts").then((r) => r.json()) as Promise<Post[]>,
      fetch("/api/tags").then((r) => r.json()) as Promise<Tag[]>,
    ]).then(([p, t]) => {
      setPosts(p);
      setTags(t);
    });
  }, [isAdmin, isLog, router]);

  const resetForm = () => {
    setForm({ ...emptyForm });
    setSelectedPostId(null);
    setImageFile(null);
    setImagePreview("");
    setMsg(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleModeChange = (m: Mode) => {
    setMode(m);
    resetForm();
  };

  const handlePostSelect = (id: number) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    setSelectedPostId(id);
    setForm({
      title: post.title,
      description: post.description,
      content: post.content,
      tagIds: post.tags.map((t) => t.id),
      imageUrl: post.imageUrl ?? "",
      published: post.published,
    });
    setImagePreview(post.imageUrl ?? "");
    setImageFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleTagToggle = (id: number) => {
    setForm((prev) => ({
      ...prev,
      tagIds: prev.tagIds.includes(id)
        ? prev.tagIds.filter((t) => t !== id)
        : [...prev.tagIds, id],
    }));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.imageUrl || null;
    const fd = new FormData();
    fd.append("file", imageFile);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) return null;
    const data = (await res.json()) as { url: string };
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const imageUrl = await uploadImage();
    const body = {
      title: form.title,
      slug: slugify(form.title),
      description: form.description,
      content: form.content,
      imageUrl,
      published: form.published,
      tagIds: form.tagIds,
      authorId: connectedUser?.id,
    };

    let res: Response;
    if (mode === "ajouter") {
      res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      if (!selectedPostId) return;
      res = await fetch(`/api/posts/${selectedPostId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    if (res.ok) {
      const saved = (await res.json()) as Post;
      if (mode === "ajouter") {
        setPosts((prev) => [saved, ...prev]);
        resetForm();
        setMsg({ type: "success", text: "Tutoriel ajouté avec succès." });
      } else {
        setPosts((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
        setMsg({ type: "success", text: "Tutoriel mis à jour." });
      }
    } else {
      const err = (await res.json().catch(() => null)) as { error?: string } | null;
      setMsg({ type: "error", text: err?.error ?? "Une erreur est survenue." });
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Supprimer ce tutoriel ?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatMsg(null);
    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName }),
    });
    if (res.ok) {
      const created = (await res.json()) as Tag;
      setTags((prev) => [...prev, created]);
      setNewCatName("");
      setCatMsg({ type: "success", text: `Catégorie "${created.name}" créée.` });
    } else {
      const err = (await res.json().catch(() => null)) as { error?: string } | null;
      setCatMsg({ type: "error", text: err?.error ?? "Erreur lors de la création." });
    }
  };

  const startEditTag = (tag: Tag) => {
    setEditingTagId(tag.id);
    setEditingName(tag.name);
    setCatMsg(null);
  };

  const saveEditTag = async (id: number) => {
    const res = await fetch(`/api/tags/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName }),
    });
    if (res.ok) {
      const updated = (await res.json()) as Tag;
      setTags((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingTagId(null);
      setCatMsg({ type: "success", text: `Catégorie renommée en "${updated.name}".` });
    } else {
      const err = (await res.json().catch(() => null)) as { error?: string } | null;
      setCatMsg({ type: "error", text: err?.error ?? "Erreur lors du renommage." });
    }
  };

  const deleteTag = async (id: number, name: string) => {
    if (!confirm(`Supprimer la catégorie "${name}" ?`)) return;
    const res = await fetch(`/api/tags/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTags((prev) => prev.filter((t) => t.id !== id));
      setForm((prev) => ({ ...prev, tagIds: prev.tagIds.filter((tid) => tid !== id) }));
      setCatMsg({ type: "success", text: `Catégorie "${name}" supprimée.` });
    }
  };

  if (!isAdmin) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-(--color-white-break)">
        <p className="text-(--color-black-break)">Chargement...</p>
      </main>
    );
  }

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)";
  const labelClass = "block text-sm font-semibold text-(--color-black-break) mb-1.5";

  const modeButtons: { key: Mode; label: string }[] = [
    { key: "ajouter", label: "Ajouter un tuto" },
    { key: "modifier", label: "Modifier un tuto" },
    { key: "supprimer", label: "Supprimer un tuto" },
    { key: "categories", label: "Gérer les catégories" },
  ];

  return (
    <main className="min-h-screen bg-(--color-white-break) px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-(--color-primary) mb-8">Administration</h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {modeButtons.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleModeChange(key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                mode === key
                  ? "bg-(--color-primary) text-white shadow-sm"
                  : "border-2 border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {(mode === "ajouter" || mode === "modifier") && (
          <>
            {mode === "modifier" && (
              <div className="mb-4">
                <label className={labelClass}>Choisir un tutoriel à modifier</label>
                <select
                  className={inputClass}
                  value={selectedPostId ?? ""}
                  onChange={(e) => handlePostSelect(Number(e.target.value))}
                >
                  <option value="">— Sélectionner —</option>
                  {posts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className={labelClass}>Titre du tutoriel</label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Mon super tutoriel"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Description</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={2}
                    placeholder="Courte description du tutoriel..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Catégorie(s)</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {tags.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => handleTagToggle(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                          form.tagIds.includes(tag.id)
                            ? "bg-(--color-primary) text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {tag.name}
                      </button>
                    ))}
                    {tags.length === 0 && (
                      <p className="text-sm text-gray-400">Aucune catégorie disponible</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Image de couverture</label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-(--color-primary) file:text-white hover:file:bg-[#1a3d8a] transition-all duration-200 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-3 h-40 rounded-xl overflow-hidden border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Contenu du tutoriel</label>
                  <textarea
                    className={`${inputClass} resize-y`}
                    rows={12}
                    placeholder="Rédigez le contenu du tutoriel ici..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, published: !form.published })}
                    className="flex items-center gap-2 select-none"
                  >
                    <div
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                        form.published ? "bg-(--color-primary)" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                          form.published ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-medium text-(--color-black-break)">
                      {form.published ? "Publié" : "Brouillon"}
                    </span>
                  </button>

                  <button
                    type="submit"
                    disabled={mode === "modifier" && !selectedPostId}
                    className="px-6 py-2.5 bg-(--color-secondary) hover:bg-[#d661a8] text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mode === "ajouter" ? "Ajouter" : "Sauvegarder"}
                  </button>
                </div>

                {msg && (
                  <p
                    className={`text-sm text-center ${
                      msg.type === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {msg.text}
                  </p>
                )}
              </form>
            </div>
          </>
        )}

        {mode === "supprimer" && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-(--color-primary) mb-4">
              Supprimer un tutoriel
            </h2>
            {posts.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Aucun tutoriel disponible</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {posts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between py-4 gap-4">
                    <div className="min-w-0">
                      <p className="font-medium text-(--color-black-break) truncate">{p.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.published ? "Publié" : "Brouillon"} ·{" "}
                        {new Date(p.createAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deletePost(p.id)}
                      className="shrink-0 px-4 py-1.5 text-sm font-medium rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {mode === "categories" && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-(--color-primary) mb-6">
              Gérer les catégories
            </h2>

            <form onSubmit={createCategory} className="flex gap-3 mb-6">
              <input
                type="text"
                className={`${inputClass} flex-1`}
                placeholder="Nom de la nouvelle catégorie"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                required
              />
              <button
                type="submit"
                className="shrink-0 px-5 py-2.5 bg-(--color-primary) hover:bg-[#1a3d8a] text-white text-sm font-semibold rounded-xl transition-all duration-200"
              >
                Ajouter
              </button>
            </form>

            {catMsg && (
              <p className={`text-sm mb-4 ${catMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {catMsg.text}
              </p>
            )}

            {tags.length === 0 ? (
              <p className="text-center text-gray-400 py-6">Aucune catégorie pour l&apos;instant</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {tags.map((tag) => (
                  <li key={tag.id} className="flex items-center gap-3 py-3">
                    {editingTagId === tag.id ? (
                      <>
                        <input
                          type="text"
                          className={`${inputClass} flex-1`}
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); saveEditTag(tag.id); }
                            if (e.key === "Escape") setEditingTagId(null);
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => saveEditTag(tag.id)}
                          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg bg-(--color-primary) text-white hover:bg-[#1a3d8a] transition-all duration-200"
                        >
                          OK
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTagId(null)}
                          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 transition-all duration-200"
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 font-medium text-(--color-black-break)">{tag.name}</span>
                        <button
                          type="button"
                          onClick={() => startEditTag(tag)}
                          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition-all duration-200"
                        >
                          Renommer
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTag(tag.id, tag.name)}
                          className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
