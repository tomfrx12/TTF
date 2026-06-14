import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/session";

export async function GET() {
  const tags = await prisma.tag.findMany({
    orderBy: { id: "asc" },
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

  return NextResponse.json(tags);
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const body = await parseJsonBody(request);
    const name = getRequiredString(body.name, "name");

    const tag = await prisma.tag.create({
      data: { name },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}
