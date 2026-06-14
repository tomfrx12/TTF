import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getRequiredString, jsonError, parseJsonBody, toSafeUser, validateEmail } from "@/lib/api";
import { createSessionValue } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const body = await parseJsonBody(request);
    const email = getRequiredString(body.email, "email");
    const password = getRequiredString(body.password, "password");

    validateEmail(email);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    const passwordMatch = user && await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return jsonError("Identifiants invalides", 401);
    }

    const response = NextResponse.json(toSafeUser(user));
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
