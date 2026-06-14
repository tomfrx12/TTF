"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type UserData = {
  id: string;
  firstname?: string;
  name?: string;
  email?: string;
  role?: { id: number; name: string } | null;
};

type CompletedPost = {
  userId: string;
  postId: number;
  completedAt: string;
  post: {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    tags: { id: number; name: string }[];
  };
};

type Role = { id: number; name: string };

type Tab = "profil" | "historique" | "admin";

interface Props {
  params: Promise<{ user: string }>;
}

export default function UserPage({ params }: Props) {
  const { user: userId } = use(params);
  const router = useRouter();
  const { isAdmin, user: connectedUser } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [tab, setTab] = useState<Tab>("profil");
  const [infos, setInfos] = useState({ firstname: "", name: "", email: "" });
  const [infosMsg, setInfosMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [mdp, setMdp] = useState({ password: "", confirm: "" });
  const [mdpMsg, setMdpMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [completions, setCompletions] = useState<CompletedPost[]>([]);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((r) => r.json())
      .then((data: UserData) => {
        setUserData(data);
        setInfos({
          firstname: data.firstname ?? "",
          name: data.name ?? "",
          email: data.email ?? "",
        });
      });
  }, [userId]);

  const loadHistorique = async () => {
    const data = await fetch(`/api/completions?userId=${userId}`).then((r) => r.json());
    setCompletions(Array.isArray(data) ? data : []);
  };

  const loadAdminData = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      fetch("/api/users").then((r) => r.json()) as Promise<UserData[]>,
      fetch("/api/roles").then((r) => r.json()) as Promise<Role[]>,
    ]);
    setAllUsers(usersRes);
    setRoles(rolesRes);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    if (t === "admin") loadAdminData();
    if (t === "historique") loadHistorique();
  };

  const saveInfos = async (e: React.FormEvent) => {
    e.preventDefault();
    setInfosMsg(null);
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: infos.firstname, name: infos.name, email: infos.email }),
    });
    if (res.ok) {
      const updated = (await res.json()) as UserData;
      setUserData(updated);
      setInfosMsg({ type: "success", text: "Informations mises à jour." });
    } else {
      setInfosMsg({ type: "error", text: "Erreur lors de la mise à jour." });
    }
  };

  const saveMdp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMdpMsg(null);
    if (mdp.password !== mdp.confirm) {
      setMdpMsg({ type: "error", text: "Les mots de passe ne correspondent pas." });
      return;
    }
    const res = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: mdp.password }),
    });
    if (res.ok) {
      setMdp({ password: "", confirm: "" });
      setMdpMsg({ type: "success", text: "Mot de passe mis à jour." });
    } else {
      setMdpMsg({ type: "error", text: "Erreur lors de la mise à jour." });
    }
  };

  const deleteAccount = async () => {
    if (!confirm("Supprimer votre compte ? Cette action est irréversible.")) return;
    await fetch(`/api/users/${userId}`, { method: "DELETE" });
    router.push("/");
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) setAllUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const toggleAdminRole = async (u: UserData) => {
    const isUserAdmin = (u.role?.name ?? "").toLowerCase().includes("admin");
    const targetRole = isUserAdmin
      ? roles.find((r) => !r.name.toLowerCase().includes("admin"))
      : roles.find((r) => r.name.toLowerCase().includes("admin"));
    if (!targetRole) return;
    const res = await fetch(`/api/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId: targetRole.id }),
    });
    if (res.ok) {
      const updated = (await res.json()) as UserData;
      setAllUsers((prev) => prev.map((x) => (x.id === u.id ? updated : x)));
    }
  };

  if (!userData) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-(--color-white-break)">
        <p className="text-(--color-black-break)">Chargement...</p>
      </main>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "profil", label: "Profil" },
    { key: "historique", label: "Historique" },
    ...(isAdmin ? [{ key: "admin" as Tab, label: "Admin" }] : []),
  ];

  const inputClass =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)";
  const labelClass = "block text-sm font-semibold text-(--color-black-break) mb-1.5";
  const saveBtn =
    "ml-auto px-6 py-2.5 bg-(--color-primary) hover:bg-[#1a3d8a] text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <main className="min-h-screen bg-(--color-white-break) px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-(--color-primary) mb-8">
          Bienvenue, {userData.firstname} {userData.name}
        </h1>

        <nav className="flex border-b border-gray-200 mb-8">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={`px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                tab === key
                  ? "border-b-2 border-(--color-primary) text-(--color-primary)"
                  : "text-gray-500 hover:text-(--color-black-break)"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "profil" && (
          <>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold text-(--color-primary) mb-4">Mes infos</h2>
              <form onSubmit={saveInfos} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Prénom</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={infos.firstname}
                      onChange={(e) => setInfos({ ...infos, firstname: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Nom</label>
                    <input
                      type="text"
                      className={inputClass}
                      value={infos.name}
                      onChange={(e) => setInfos({ ...infos, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={infos.email}
                      onChange={(e) => setInfos({ ...infos, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {infosMsg && (
                    <p className={`text-sm ${infosMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {infosMsg.text}
                    </p>
                  )}
                  <button type="submit" className={saveBtn}>
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-6">
              <h2 className="text-lg font-semibold text-(--color-primary) mb-4">Mot de passe</h2>
              <form onSubmit={saveMdp} className="space-y-4">
                <div>
                  <label className={labelClass}>Nouveau mot de passe</label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="••••••••"
                    value={mdp.password}
                    onChange={(e) => setMdp({ ...mdp, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Confirmer le mot de passe</label>
                  <input
                    type="password"
                    className={inputClass}
                    placeholder="••••••••"
                    value={mdp.confirm}
                    onChange={(e) => setMdp({ ...mdp, confirm: e.target.value })}
                    required
                  />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {mdpMsg && (
                    <p className={`text-sm ${mdpMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                      {mdpMsg.text}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={!mdp.password || mdp.password !== mdp.confirm}
                    className={saveBtn}
                  >
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={deleteAccount}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200"
              >
                Supprimer le compte
              </button>
            </div>
          </>
        )}

        {tab === "historique" && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-(--color-primary) mb-6">
              Tutoriels terminés
            </h2>
            {completions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-2">Aucun tutoriel terminé pour l&apos;instant.</p>
                <Link href="/tutoriels" className="text-sm font-semibold text-(--color-primary) hover:underline">
                  Parcourir les tutoriels →
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {completions.map((c) => (
                  <li key={c.postId} className="py-4 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/tutoriels/${c.post.slug}`}
                        className="font-medium text-(--color-black-break) hover:text-(--color-primary) transition-colors duration-200 truncate block"
                      >
                        {c.post.title}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{c.post.description}</p>
                      {c.post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {c.post.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-(--color-primary)/10 text-(--color-primary)"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                        ✓ Terminé
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(c.completedAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === "admin" && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-(--color-primary) mb-6">
              Gestion des utilisateurs
            </h2>
            {allUsers.length === 0 ? (
              <p className="text-center text-gray-400 py-8">Chargement...</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {allUsers.map((u) => {
                  const uIsAdmin = (u.role?.name ?? "").toLowerCase().includes("admin");
                  const isSelf = u.id === connectedUser?.id;
                  return (
                    <li key={u.id} className="flex items-center justify-between py-4 gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-(--color-black-break) truncate">
                          {u.firstname} {u.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{u.email}</p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          uIsAdmin
                            ? "bg-(--color-primary) text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role?.name ?? "—"}
                      </span>
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => toggleAdminRole(u)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {uIsAdmin ? "Retirer admin" : "Mettre admin"}
                        </button>
                        <button
                          type="button"
                          disabled={isSelf}
                          onClick={() => deleteUser(u.id)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
