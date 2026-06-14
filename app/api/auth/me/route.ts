import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { jsonError, toSafeUser } from "@/lib/api";

export async function GET() {
  try {
    const user = await getSession();
    if (!user) return jsonError("Non authentifié", 401);
    return NextResponse.json(toSafeUser(user));
  } catch {
    return jsonError("Erreur serveur", 500);
  }
}
