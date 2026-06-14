import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getRequiredString, jsonError, parseJsonBody, toSafeUser, validateEmail, validatePassword } from "@/lib/api";
import { createSessionValue } from "@/lib/session";

async function getDefaultRoleId() {
  const studentRole = await prisma.role.findFirst({
    where: { name: { equals: "student", mode: "insensitive" } },
  });

  if (studentRole) {
    return studentRole.id;
  }

  const fallbackRole = await prisma.role.findFirst({
    orderBy: { id: "asc" },
  });

  return fallbackRole?.id ?? null;
}

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    const email = getRequiredString(body.email, "email");
    const firstname = getRequiredString(body.firstname, "firstname");
    const name = getRequiredString(body.name, "name");
    const password = getRequiredString(body.password, "password");

    validateEmail(email);
    validatePassword(password);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return jsonError("Un compte existe déjà avec cet email", 409);
    }

    const roleId = await getDefaultRoleId();

    if (!roleId) {
      return jsonError("Aucun rôle par défaut n'est disponible", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        firstname,
        name,
        password: hashedPassword,
        roleId,
      },
      include: { role: true },
    });

    const response = NextResponse.json(toSafeUser(user), { status: 201 });
    response.cookies.set("ttf_session", createSessionValue(user.id), {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
