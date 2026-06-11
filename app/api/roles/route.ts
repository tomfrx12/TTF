import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const roles = await prisma.role.findMany({
    orderBy: { id: "asc" },
  });

  return NextResponse.json(roles);
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    const name = getRequiredString(body.name, "name");

    const role = await prisma.role.create({
      data: { name },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
