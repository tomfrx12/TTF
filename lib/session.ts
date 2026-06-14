import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./db";

const SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-in-prod";

function sign(userId: string) {
  return createHmac("sha256", SECRET).update(userId).digest("base64url");
}

export function createSessionValue(userId: string) {
  return `${userId}.${sign(userId)}`;
}

export function parseSessionValue(value: string): string | null {
  const dotIndex = value.lastIndexOf(".");
  const userId = value.slice(0, dotIndex);
  const sig = value.slice(dotIndex + 1);
  if (!userId || !sig || sign(userId) !== sig) return null;
  return userId;
}

export async function getSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get("ttf_session")?.value;
  if (!value) return null;
  const userId = parseSessionValue(value);
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) throw new Error("Non authentifié");
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (!user.role.name.toLowerCase().includes("admin")) throw new Error("Accès refusé");
  return user;
}
