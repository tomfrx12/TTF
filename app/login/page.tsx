"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const { Login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await Login();
    router.push(`/users/demo-user`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-(--color-white-break) px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-(--color-black-break) text-center mb-8 animate-title-connexion">
          {mode === "signin" ? "Se connecter" : "Créer un compte"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <>
            <div>
              <label className="block text-sm font-semibold text-(--color-black-break) mb-1.5">
                Prénom
              </label>
              <input 
                type="text"
                placeholder="Votre prénom"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)"
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-(--color-black-break) mb-1.5">
                Nom
              </label>
              <input 
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
            </div>
            </>
          )}

          <div>
            <label className="block text-sm font-semibold text-(--color-black-break) mb-1.5">
              Email
            </label>
            <input 
              type="email" 
              placeholder="exemple@domaine.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-(--color-black-break) mb-1.5">
              Mot de passe
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:border-transparent transition-all duration-200 text-(--color-black-break)"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-(--color-secondary) hover:bg-[#d661a8] text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-200 text-center"
          >
            {mode === "signin" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "signin" ? (
            <>
              Pas encore de compte ?{" "}
              <button 
                onClick={() => setMode("signup")}
                className="text-(--color-primary) font-semibold hover:underline focus:outline-none"
              >
                Créer un compte
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <button 
                onClick={() => setMode("signin")}
                className="text-(--color-primary) font-semibold hover:underline focus:outline-none"
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  );
}