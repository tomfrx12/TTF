import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getRequiredString, jsonError, parseJsonBody, toSafeUser, validatePassword } from "@/lib/api";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/session";

async function getUserId(params: Promise<{ userId: string }> | { userId: string }) {
  const resolvedParams = await Promise.resolve(params);
  return resolvedParams.userId;
}

export async function GET(_request: Request, context: { params: Promise<{ userId: string }> | { userId: string } }) {
  try {
    const userId = await getUserId(context.params);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
        posts: {
          orderBy: { createAt: "desc" },
        },
      },
    });

    if (!user) {
      return jsonError("Ressource introuvable", 404);
    }

    return NextResponse.json(toSafeUser(user));
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ userId: string }> | { userId: string } }) {
  try {
    const session = await requireAuth();
    const userId = await getUserId(context.params);
    const isAdmin = session.role.name.toLowerCase().includes("admin");

    if (session.id !== userId && !isAdmin) {
      return jsonError("Accès refusé", 403);
    }

    const body = await parseJsonBody(request);
    const data: {
      email?: string;
      firstname?: string;
      name?: string;
      password?: string;
      roleId?: number;
    } = {};

    if (body.email !== undefined) {
      data.email = getRequiredString(body.email, "email");
    }

    if (body.firstname !== undefined) {
      data.firstname = getRequiredString(body.firstname, "firstname");
    }

    if (body.name !== undefined) {
      data.name = getRequiredString(body.name, "name");
    }

    if (body.password !== undefined) {
      const raw = getRequiredString(body.password, "password");
      validatePassword(raw);
      data.password = await bcrypt.hash(raw, 12);
    }

    if (body.roleId !== undefined) {
      if (!isAdmin) return jsonError("Accès refusé", 403);
      const roleId = Number(body.roleId);
      if (!Number.isInteger(roleId)) throw new Error("roleId invalide");
      data.roleId = roleId;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        role: true,
        posts: true,
      },
    });

    return NextResponse.json(toSafeUser(user));
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ userId: string }> | { userId: string } }) {
  try {
    const session = await requireAuth();
    const userId = await getUserId(context.params);
    const isAdmin = session.role.name.toLowerCase().includes("admin");

    if (session.id !== userId && !isAdmin) {
      return jsonError("Accès refusé", 403);
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}
