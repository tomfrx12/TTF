"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CompletionButton({ postId }: { postId: number }) {
  const { user, isLog } = useAuth();
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLog || !user) {
      setLoading(false);
      return;
    }
    fetch(`/api/completions?userId=${user.id}&postId=${postId}`)
      .then((r) => r.json())
      .then((data: { completed: boolean }) => {
        setCompleted(data.completed);
        setLoading(false);
      });
  }, [isLog, user, postId]);

  const toggle = async () => {
    if (!user) return;
    const res = await fetch("/api/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, postId }),
    });
    if (res.ok) {
      const data = (await res.json()) as { completed: boolean };
      setCompleted(data.completed);
    }
  };

  if (!isLog || loading) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
        completed
          ? "bg-green-500 hover:bg-green-600 text-white shadow-sm"
          : "border-2 border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
      }`}
    >
      <span className={`text-base leading-none transition-transform duration-200 ${completed ? "scale-110" : ""}`}>
        {completed ? "✓" : "○"}
      </span>
      {completed ? "Terminé" : "Marquer comme terminé"}
    </button>
  );
}
