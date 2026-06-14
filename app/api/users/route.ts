import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody, toSafeUser } from "@/lib/api";
import { prisma } from "@/lib/db";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createAt: "desc" },
    include: {
      role: true,
      posts: {
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          createAt: true,
        },
        orderBy: { createAt: "desc" },
      },
    },
  });

  return NextResponse.json(users.map(toSafeUser));
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    const email = getRequiredString(body.email, "email");
    const firstname = getRequiredString(body.firstname, "firstname");
    const name = getRequiredString(body.name, "name");
    const password = getRequiredString(body.password, "password");
    const roleId = Number(body.roleId);

    if (!Number.isInteger(roleId)) {
      throw new Error("roleId invalide");
    }

    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        name,
        password,
        roleId,
      },
      include: {
        role: true,
        posts: true,
      },
    });

    return NextResponse.json(toSafeUser(user), { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
