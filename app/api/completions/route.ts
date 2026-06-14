import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { jsonError } from "@/lib/api";
import { requireAuth } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    if (!userId) {
      return jsonError("userId requis", 400);
    }

    if (postId !== null) {
      const completion = await prisma.completion.findUnique({
        where: { userId_postId: { userId, postId: Number(postId) } },
      });
      return NextResponse.json({ completed: completion !== null });
    }

    const completions = await prisma.completion.findMany({
      where: { userId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            imageUrl: true,
            tags: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { completedAt: "desc" },
    });

    return NextResponse.json(completions);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAuth();
    const { userId, postId } = (await request.json()) as { userId: string; postId: number };

    if (!userId || !postId) {
      return jsonError("userId et postId requis", 400);
    }

    if (session.id !== userId) {
      return jsonError("Accès refusé", 403);
    }

    const existing = await prisma.completion.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existing) {
      await prisma.completion.delete({
        where: { userId_postId: { userId, postId } },
      });
      return NextResponse.json({ completed: false });
    }

    await prisma.completion.create({
      data: { userId, postId },
    });

    return NextResponse.json({ completed: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    const status = msg === "Non authentifié" ? 401 : msg === "Accès refusé" ? 403 : 400;
    return jsonError(msg, status);
  }
}
