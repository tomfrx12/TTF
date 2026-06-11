import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody, toSafeUser } from "@/lib/api";
import { prisma } from "@/lib/prisma";

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
    const userId = await getUserId(context.params);
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
      data.password = getRequiredString(body.password, "password");
    }

    if (body.roleId !== undefined) {
      const roleId = Number(body.roleId);

      if (!Number.isInteger(roleId)) {
        throw new Error("roleId invalide");
      }

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
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ userId: string }> | { userId: string } }) {
  try {
    const userId = await getUserId(context.params);

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
