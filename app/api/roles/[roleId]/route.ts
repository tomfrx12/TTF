import { NextResponse } from "next/server";
import { getRequiredString, jsonError, parseJsonBody } from "@/lib/api";
import { prisma } from "@/lib/prisma";

async function getRoleId(params: Promise<{ roleId: string }> | { roleId: string }) {
  const resolvedParams = await Promise.resolve(params);
  const roleId = Number(resolvedParams.roleId);

  if (!Number.isInteger(roleId)) {
    throw new Error("Identifiant de rôle invalide");
  }

  return roleId;
}

export async function GET(_request: Request, context: { params: Promise<{ roleId: string }> | { roleId: string } }) {
  try {
    const roleId = await getRoleId(context.params);
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return jsonError("Ressource introuvable", 404);
    }

    return NextResponse.json(role);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ roleId: string }> | { roleId: string } }) {
  try {
    const roleId = await getRoleId(context.params);
    const body = await parseJsonBody(request);
    const name = getRequiredString(body.name, "name");

    const role = await prisma.role.update({
      where: { id: roleId },
      data: { name },
    });

    return NextResponse.json(role);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ roleId: string }> | { roleId: string } }) {
  try {
    const roleId = await getRoleId(context.params);

    await prisma.role.delete({
      where: { id: roleId },
    });

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Erreur serveur", 400);
  }
}
