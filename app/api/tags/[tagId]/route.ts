import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

async function getTagId(params: Promise<{ tagId: string }> | { tagId: string }) {
  const resolvedParams = await Promise.resolve(params);
  const tagId = Number(resolvedParams.tagId);

  if (!Number.isInteger(tagId)) {
    throw new Error("Identifiant de tag invalide");
  }

  return tagId;
}

export async function GET(_request: Request, context: { params: Promise<{ tagId: string }> | { tagId: string } }) {
  try {
    const tagId = await getTagId(context.params);
    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
      include: {
        posts: {
          select: {
            id: true,
            title: true,
            slug: true,
            published: true,
          },
        },
      },
    });

    if (!tag) {
      return jsonError("Ressource introuvable", 404);
    }

    return NextResponse.json(tag);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ tagId: string }> | { tagId: string } }) {
  try {
    await requireAdmin();

    const tagId = await getTagId(context.params);
    const body = await parseJsonBody(request);
    const name = getRequiredString(body.name, "name");

    const tag = await prisma.tag.update({
      where: { id: tagId },
      data: { name },
    });

    return NextResponse.json(tag);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ tagId: string }> | { tagId: string } }) {
  try {
    await requireAdmin();

    const tagId = await getTagId(context.params);

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}
