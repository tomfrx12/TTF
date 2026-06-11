import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/prisma";

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
    const body = await parseJsonBody(request);
    const name = getRequiredString(body.name, "name");

    const tag = await prisma.tag.create({
      data: { name },
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
